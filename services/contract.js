
/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const Contracts = require('../models/Contracts');

module.exports = {

    /** @function createContract
       * @desc This function is for creating a contract
       * @param {JSON Object} contractDetails includes the contract details for registration
       */
    createContract: async (contractDetails) => {

        var result = {};
        const data = {
            file_hash: contractDetails.fileHash,
            created_by: contractDetails.id,
            name: contractDetails.name,
            status: 'Pending'
        }

        const dbContractResponse = await Contracts.create(data);
        logger.info('DB Contract raised response: ', dbContractResponse);
        result.id = dbContractResponse.id;
        result.message = 'Contract raised successfully';
        return result;
    },

    /** @function contractAction
     * @desc This function is for accepting or rejecting a contract
     * @param {JSON Object} contractDetails includes the contract id and status
     */
    contractAction: async (contractDetails) => {

        const dbContractResponse = await Contracts.findByIdAndUpdate(contractDetails.contractId, {
            $set: {
                status: contractDetails.status
            }
        });
        logger.info('DB Contract action response: ', dbContractResponse);
        return { contractId: contractDetails.contractId, message: 'Contract ' + contractDetails.status };
    },

}