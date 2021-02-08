const winston = require('winston');
const moment = require('moment');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
    new winston.transports.File({
      filename: `${__dirname}/../../logs/LOG-${moment(new Date()).format('YYYY-MM-DD_hh-mm')}.log`,
      maxsize: 1024 * 1024 * 10, // ~10MB
      format: winston.format.combine(winston.format.uncolorize()),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
