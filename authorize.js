const app = require("./app");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

const User = require("./models/user-model");

passport.use(
	new BasicStrategy(function (username, password, done) {
		User.findOne({ username: username }, async function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false);
			}
			if (!(await user.authenticate(password))) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

exports.authenticate = passport.authenticate("basic", { session: false });
