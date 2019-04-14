
/** ********************** Require Node modules ********************* */
const winston = require('winston');
const fs = require('fs');

/** ********************** Varaiable Listing ********************* */
const logDirectory = './logs';
const fileLogFormat = winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

if (!fs.existsSync(logDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: `${logDirectory}/project.log`,
      format: winston.format.combine(
        winston.format.timestamp(),
        fileLogFormat,
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
