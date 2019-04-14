
/** ********************** Require node modules ************************ */
const bcrypt = require('bcrypt-nodejs');


/** @function encryptPassword
* @desc This function is used to encrypt password of a user
* @param {String} password consist of user input password
* @return {String} hash of the password
*/
function encryptPassword(password) {
  return bcrypt.hashSync(password, null);
}


/** @function comparePassword
* @desc This function is used to compare password of a user
* @param {String} password consist of user input password
* @param {JSON object} user includes user's password
* @return {Boolean} true if password is matched
*/
function comparePassword(password, user) {
  return bcrypt.compareSync(password, user.password);
}


module.exports = {
  encryptPassword,
  comparePassword,
};
