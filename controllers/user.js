
/* ********************************* Import Local Modules ********************************* */
const Boom = require('boom');
const config = require('config');
const ipfsAPI = require('ipfs-api');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService } = require('../services');

const ipfsOptions = config.get('ipfs');
const ipfs = ipfsAPI(ipfsOptions.host, ipfsOptions.port, { protocol: ipfsOptions.protocol });

module.exports = {

  /** @function login
     * @desc This function is for user login
     * @param {JSON Object} req includes the user email and password
     * @param {JSON Object} res includes status and data includes token and user details
     */
  login: async (req, res, next) => {

    logger.info("Login Request: ", req.body);

    try {
      let loginResult = await userService.login(req.body);
      if (loginResult.email) {
        res.data = loginResult;
        next();
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Invalid password') {
        next(Boom.unauthorized('Invalid Password'));
      } else if (err.message === 'User does not exist') {
        next(Boom.notFound('User does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  /** @function getAllVendors
     * @desc This function is for fetching all vendors
     * @param {JSON Object} req includes the user id
     * @param {JSON Object} res includes status and data includes vendor list
     */
  getAllVendors: async (req, res, next) => {

    logger.info("Get All Vendors Request: ", req.params);

    try {
      let userResult = await userService.getUsersbyRole('Vendor');
      if (userResult.length > 0) {
        res.data = userResult;
        next();
      } else {
        next(Boom.notFound('No Vendors found'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  /** @function getAllCustomers
     * @desc This function is for fetching all customers
     * @param {JSON Object} req includes the user id
     * @param {JSON Object} res includes status and data includes customer list
     */
  getAllCustomers: async (req, res, next) => {

    logger.info("Get All Customers Request: ", req.params);

    try {
      let userResult = await userService.getUsersbyRole('Customer');
      if (userResult.length > 0) {
        res.data = userResult;
        next();
      } else {
        next(Boom.notFound('No Customers found'));
      }
    } catch (err) {
      logger.error(err);
      next(Boom.conflict('Something went wrong'));
    }
  },

  /** @function getContractFile
     * @desc This function is for fetching contract file
     * @param {JSON Object} req includes the user id
     * @param {JSON Object} res includes file
     */
  getContractFile: async (req, res, next) => {

    logger.info("Get Contract file Request: ", req.params);

    ipfs.files.get(req.params.hash, (err, files) => {
      if (err) {
        logger.error("Error while fetching brand file from IPFS:", err);
        next(Boom.conflict('Something went wrong'));
      } else {
        const file = JSON.parse(files[0].content);
        logger.info("Brand File fetched: ", file.originalname);
        res.end(new Buffer(file.buffer), 'binary');
      }
    });
  }

}