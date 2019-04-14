
/* ********************************* Import Local Modules ********************************* */
const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { contractService } = require('../services');

module.exports = {

    /** @function contractAction
       * @desc This function is for accepting or rejecting a contract
       * @param {JSON Object} req includes the contract details
       * @param {JSON Object} res includes status and data
       */
    contractAction: async (req, res, next) => {

        logger.info("Contract Action Request: ", req.body);

        try {
            if (req.body.userRole === "Vendor") {
                let contractResult = await contractService.contractAction(req.body);
                if (contractResult.contractId) {
                    res.data = contractResult;
                    next();
                } else {
                    next(Boom.conflict('Something went wrong'));
                }
            } else {
                next(Boom.unauthorized('Invalid User role'));
            }
        } catch (err) {
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
        }
    }

}