const rateLimit = require('express-rate-limit');

//Per hour max request count 5
const requestLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
});

module.exports = {
    requestLimit,
};