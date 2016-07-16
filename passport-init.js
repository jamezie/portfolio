var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');

module.exports = function(passport) {

	// Passport needs to be able to serialize and deserialize users to support
	passport.serializeUser(function(user, done) {
		console.log('serializing user: ', user.username);
		return done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user:', user.username);
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
			passReqToCallback: true
		},
		function(req, username, password, done) {
			User.findOne({'username': username}, function(err, user) {
				if(err)
					return done(err);

				// user not found
				if(!user) 
					return done(null, false);

				if(!isValidPassword(user, password))
					return done(null, false);

				return done(null, user);
			});
		}
	));

	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {
		console.log("In passport module: signup");

		User.findOne({'username' : username}, function(err, user) {
			if(err)
				return done(err);

			if(user)
				return done(null, false);

			var newUser = new User();
			newUser.username = username;
			newUser.password = createHash(password);
			newUser.save(function(err) {
				if(err)
					throw err;

				console.log(newUser.username + ' Registration successful.');
				return done(null, newUser);
			});
		})
	}));

	var isValidPassword = function(user, password) {
		return bCrypt.compareSync(password, user.password);
	};

	var createHash = function(password) {
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};
}