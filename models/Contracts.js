
/* ********************************* Import node Modules ********************************* */
const mongoose = require('mongoose');

/* ********************************* Import Local Modules ********************************* */
const DB = require('../dbConnection');

const contractSchema = mongoose.Schema({

    file_hash: { type: String, required: true },
    name: { type: String },
    status: { type: String, enum: ['Accepted', 'Rejected', 'Pending'], default: 'Pending' },
    code: { type: String, index: { unique: true } },
    created_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Schema.Types.ObjectId, },
    last_modified_at: { type: Date },
    last_modified_by: { type: mongoose.Schema.Types.ObjectId, }

});

module.exports = DB.model('Contracts', contractSchema);