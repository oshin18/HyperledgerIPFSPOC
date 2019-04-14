
/* ********************************* Import Local Modules ********************************* */
const Boom = require('boom');
const config = require('config');
const ipfsAPI = require('ipfs-api');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService, contractService } = require('../services');

const ipfsOptions = config.get('ipfs');
const ipfs = ipfsAPI(ipfsOptions.host, ipfsOptions.port, { protocol: ipfsOptions.protocol });

module.exports = {

    /** @function registerUser
       * @desc This function is for user registration by company 
       * @param {JSON Object} req includes the user details
       * @param {JSON Object} res includes status and data
       */
    registerUser: async (req, res, next) => {

        logger.info("User Registration Request: ", req.body);

        try {
            if (req.body.userRole === "Company") {
                req.body.code = req.body.email + " hyperledger code";
                let userRegistered = await userService.registerUser(req.body);
                if (userRegistered.userId) {
                    res.data = userRegistered;
                    next();
                } else {
                    next(Boom.conflict('Something went wrong'));
                }
            } else {
                next(Boom.unauthorized('Invalid User role'));
            }
        } catch (err) {
            logger.error(err);
            if (err.code === 11000) {
                next(Boom.conflict('User already exist'));
            } else {
                next(Boom.conflict('Something went wrong'));
            }
        }
    },

    /** @function raiseContract
       * @desc This function is for raising a contract for vendor
       * @param {JSON Object} req includes the vendor id and file
       * @param {JSON Object} res includes status and data
       */
    raiseContract: async (req, res, next) => {

        logger.info("Raise Contract Request: ", req.body);
        const file = req.file;
        const fileBuffer = Buffer.from(JSON.stringify(file));

        try {
            if (req.body.userRole === "Company") {
                let vendorResult = await userService.getUserDetails(req.body.vendorId);
                if (vendorResult.get('role') === 'Vendor') {
                    ipfs.files.add(fileBuffer, async (err, IPFSResponse) => {
                        if (err) {
                            logger.error("Error while IPFS upload:", err);
                            next(Boom.conflict('Error while uploading to IPFS'));
                        } else {
                            logger.info("IPFS response:", IPFSResponse);
                            req.body.fileHash = IPFSResponse[0].hash;
                            let contractResult = await contractService.createContract(req.body);
                            await userService.updateContract({
                                vendorId: req.body.vendorId,
                                contractId: contractResult.id
                            });
                            res.data = contractResult;
                            next();
                        }
                    });
                } else {
                    next(Boom.unauthorized('Invalid Vendor Id'));
                }
            } else {
                next(Boom.unauthorized('Invalid User role'));
            }
        } catch (err) {
            logger.error(err);
            if (err.message === "User does not exist") {
                next(Boom.conflict('Vendor does not exist'));
            } else {
                next(Boom.conflict('Something went wrong'));
            }
        }
    }

}