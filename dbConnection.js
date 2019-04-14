
/** ********************** Require node modules ************************ */
const mongoose = require('mongoose');
const config = require('config');

/** ********************** Require local modules ************************ */
const { logger } = require('./utils');

/** ********************** Varaiable Listing ********************* */
const { dbConfig } = config.get('General');


/** Database Connection */
module.exports = mongoose.createConnection(dbConfig,
    { useNewUrlParser: true }, (err) => {
        if (err) {
            logger.error(err);
        } else {
            logger.info('Database Connection established');
        }
    });
