
/* ********************************* Import Node Modules ********************************* */
const multer = require('multer');

/* ********************************* Import Local Modules ********************************* */
const { userController, companyController, vendorController } = require('./controllers');
const { validator, authenticator } = require('./middlewares');

/* ********************************* Variale Listing ********************************* */
const upload = multer();

module.exports = (app) => {

  app.post('/check', (req, res) => {
    res.send({ status: true, message: 'Ok' });
  });

  /* ********************************* User APIs ********************************* */
  app.post('/login', validator, userController.login);

  app.get('/user/:id/vendor', authenticator, validator, userController.getAllVendors);

  app.get('/user/:id/customer', authenticator, validator, userController.getAllCustomers);

  app.get('/user/:id/contract/:hash', authenticator, validator, userController.getContractFile);

  /* ********************************* Company APIs ********************************* */
  app.post('/registerUser', authenticator, validator, companyController.registerUser);

  app.post('/raiseContract', upload.single('file'), authenticator, validator, companyController.raiseContract);

  /* ********************************* Vendor APIs ********************************* */
  app.post('/contractAction', authenticator, validator, vendorController.contractAction);


};
