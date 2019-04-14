
/* ********************************* Import Node Modules ********************************* */
const config = require('config');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('./utils');
const Users = require('./models/Users');

/* ********************************* Variable Listing ********************************* */
const companyDetails = config.get('CompanySeed');

Users.find()
    .then((result) => {
        if (result.length === 0) {
            Users.create(companyDetails);
            logger.info("Company Registered with email: ", companyDetails.email);
        } else {
            logger.info("Company Already registered");
        }
    })
    .catch((error) => {
        logger.error("Something went wrong while checking Company registered");
    })
