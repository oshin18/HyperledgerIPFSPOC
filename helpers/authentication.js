
/** ********************** Require node modules ************************ */
const Promise = require('bluebird');
const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

/** ********************** Require local modules ************************ */
const { logger } = require('../utils');

/** ********************** Variable listing ************************** */
const { secretKey } = config.get('General');


/** @function createToken
* @desc This function is used to create token for the user
* @param {JSON object} user includes user details
* @return {String} token
*/
function createToken(user) {
  const token = jsonwebtoken.sign({
    user: { email: user.email, id: user.id, role: user.role },
  }, secretKey, {
      expiresIn: '30 days',
    });
  return token;
}


/** @function authenticateUser
 * @desc This function is used for authenticating the user.
 * @param {String} token user's token
 */
function authenticateUser(token) {
  return new Promise(((resolve, reject) => {
    jsonwebtoken.verify(token, secretKey, (err, decode) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        resolve(decode);
      }
    });
  }));
}


module.exports = {
  createToken,
  authenticateUser,
};
