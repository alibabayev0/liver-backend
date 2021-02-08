const passport = require('passport');

module.exports.oAuth = (service) => passport.authenticate(service, { session: false });
