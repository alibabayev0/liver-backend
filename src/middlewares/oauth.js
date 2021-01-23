const passport = require('passport');
const ApiError = require('../utils/api_error');
const httpStatus = require('http-status');

module.exports.oAuth = service => passport.authenticate(service, { session: false });
