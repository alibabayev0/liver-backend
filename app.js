const express = require('express');
const cors = require("cors");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const passport = require('passport');   
const authLimiter = require('./src/middlewares/rate_limit');
const routes = require('./src/routes/v1/index'); 
const { errorConverter, errorHandler } = require('./src/middlewares/error');
const ErrorApi = require('./src/utils/api_error');

const app = express();

if (config.env !== 'test') {
     app.use(morgan.successHandler);
     app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
     app.use('/v1/auth', authLimiter);
}

app.use('/v1',routes);

app.use((req, res, next) => {
     next(new ErrorApi(httpStatus.NOT_FOUND, 'Not Found!!'));
});

app.use(errorConverter);

app.use(errorHandler);


module.exports = app; 