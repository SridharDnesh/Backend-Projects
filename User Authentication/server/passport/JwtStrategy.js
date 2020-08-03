const User = require("../database/models/Users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET ? process.env.JWT_SECRET : "a secret",
};

const Strategy = new JwtStrategy(options, function (payload, done) {
  User.findOne({ _id: payload.sub }, function (err, user) {
    if (err) {
      return done(err, null);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

module.exports = Strategy;
