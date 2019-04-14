
/** ********************** Require Node modules ********************* */
const Boom = require('boom');

module.exports = async (req, res, next) => {
  if (res.data) {
    res.status(200).json({ status: true, data: res.data });
  } else if (res.message) {
    res.status(200).json({ status: true, message: res.message });
  } else {
    next(Boom.badImplementation('No API response'));
  }
};