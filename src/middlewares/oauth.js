const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/api_error');

module.exports.oAuth = (service) => passport.authenticate(service, { session: false });
