const passport = require("passport");

const JWTStrategy = require("./JwtStrategy");

passport.use(JWTStrategy);

module.exports = passport;
