
/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { encryption, authentication } = require('../helpers');
const Users = require('../models/Users');

module.exports = {

  /** @function login
     * @desc This function is for user login
     * @param {JSON Object} userDetails includes the user email and password
     */
  login: async (userDetails) => {

    const projections = {
      password: true,
      role: true,
      email: true,
      status: true,
      id_contract: true,
      name: true
    }
    var result = {};

    const dbLoginResponse = await Users.findOne({ email: userDetails.email }, projections);
    if (dbLoginResponse) {
      logger.info('DB User login response: ', dbLoginResponse);
      const validPassword = encryption.comparePassword(userDetails.password, dbLoginResponse);
      if (!validPassword) {
        logger.error('DB User login error: Invalid password!');
        throw new Error('Invalid password!');
      } else {
        const token = authentication.createToken(dbLoginResponse);
        result.token = token;
        result.message = 'Successful login';
        result.email = dbLoginResponse.email;
        result.id = dbLoginResponse.id;
        result.status = dbLoginResponse.status;
        result.role = dbLoginResponse.designation;
        result.contract = dbLoginResponse.id_contract;
        result.name = dbLoginResponse.name;
        logger.info('DB login response: ', result);
        return result;
      }
    } else {
      logger.error('DB User login error: User does not exist');
      throw new Error('User does not exist');
    }
  },

  /** @function getUserDetails
     * @desc This function is for fetching user details
     * @param {String} userId includes the id of the user
     */
  getUserDetails: async (userId) => {

    const dbUserResponse = await Users.findById(userId);
    if (dbUserResponse) {
      logger.info('DB User Details response: ', dbUserResponse);
      return dbUserResponse;
    } else {
      logger.error('DB User Details error: User does not exist');
      throw new Error('User does not exist');
    }
  },

  /** @function registerUser
     * @desc This function is for registering a user 
     * @param {JSON Object} userDetails includes the user details for registration
     */
  registerUser: async (userDetails) => {

    const encryptedPassword = await encryption.encryptPassword(userDetails.password);
    var result = {};
    const data = {
      email: userDetails.email,
      password: encryptedPassword,
      role: userDetails.role,
      created_by: userDetails.id,
      name: userDetails.name,
      code: userDetails.code
    }

    const dbUserResponse = await Users.create(data);
    logger.info('DB User Details response: ', dbUserResponse);
    result.userId = dbUserResponse.id;
    result.message = 'User registered successfully';
    return result;
  },

  /** @function updateContract
     * @desc This function is for raising a contract
     * @param {JSON Object} userDetails includes the vendor id and contract id
     */
  updateContract: async (userDetails) => {

    const dbUserResponse = await Users.findByIdAndUpdate(userDetails.vendorId, {
      $set: {
        id_contract: userDetails.contractId
      }
    });
    logger.info('DB Raise Contract response: ', dbUserResponse);
    return dbUserResponse;
  },

  /** @function getUsersbyRole
     * @desc This function is for fetching users by role
     * @param {String} userRole includes the role of the user
     */
  getUsersbyRole: async (userRole) => {

    const dbUserResponse = await Users.find({ role: userRole });
    logger.info('DB User by role response: ', dbUserResponse);
    return dbUserResponse;
  },

}