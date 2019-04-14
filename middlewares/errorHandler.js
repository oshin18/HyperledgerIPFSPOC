
/** ********************** Require Node modules ********************* */
const { logger } = require('../utils');

const errorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    // eslint-disable-next-line no-param-reassige, no-useless-escape
    err.output.payload.message = err.output.payload.message.replace(/[\|"]/g, "");
    logger.error(err.output.payload);
    return res
      .status(err.output.statusCode || 500)
      .json(err.output.payload);
  }
  return next(err);
};

module.exports = errorHandler;