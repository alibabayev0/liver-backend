const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const BearerStrategy = require('passport-http-bearer');
const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');
const { oAuthService } = require('../services');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const oAuth = (service) => async (token, done) => {
  try {
    const userData = await oAuthService[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwt);
const facebookStrategy = new BearerStrategy(oAuth('facebook'));
const googleStrategy = new BearerStrategy(oAuth('google'));

module.exports = {
  jwtStrategy,
  facebookStrategy,
  googleStrategy,
};
