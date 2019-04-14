
/** ********************** Require Node modules ********************* */
const JOI = require('joi');
const Boom = require('boom');

/** ********************** Require Local modules ********************* */
const { logger } = require('../utils');

const schema = {
  '/login': {
    body: JOI.object().keys({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
    }),
    params: null,
  },
  '/registerUser': {
    body: JOI.object().keys({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
      role: JOI.string().valid('Customer', 'Vendor').required(),
      name: JOI.string().required(),
      id: JOI.string().required(),
      userRole: JOI.string().required()
    }),
    params: null,
  },
  '/raiseContract': {
    body: JOI.object().keys({
      vendorId: JOI.string().required(),
      id: JOI.string().required(),
      name: JOI.string().required(),
      userRole: JOI.string().required()
    }),
    params: null,
  },
  '/contractAction': {
    body: JOI.object().keys({
      id: JOI.string().required(),
      contractId: JOI.string().required(),
      status: JOI.string().valid('Accepted', 'Rejected').required(),
      userRole: JOI.string().required()
    }),
    params: null,
  },
  '/user/:id/vendor': {
    body: JOI.object().keys({
      userRole: JOI.string().required()
    }),
    params: JOI.object().keys({
      id: JOI.string().required()
    }),
  },
  '/user/:id/customer': {
    body: JOI.object().keys({
      userRole: JOI.string().required()
    }),
    params: JOI.object().keys({
      id: JOI.string().required()
    }),
  },
  '/user/:id/contract/:hash': {
    body: JOI.object().keys({
      userRole: JOI.string().required()
    }),
    params: JOI.object().keys({
      id: JOI.string().required(),
      hash: JOI.string().required()
    }),
  }
}

module.exports = async (req, res, next) => {

  try {
    if (schema[req.route.path].body) {
      await JOI.validate(req.body, schema[req.route.path].body);
    }
    if (schema[req.route.path].params) {
      await JOI.validate(req.params, schema[req.route.path].params);
    }
    next();
  } catch (err) {
    logger.error("Error in API validation", err.details[0].message);
    next(Boom.badData(err.details[0].message));
  }
};