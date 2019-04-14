
/* ********************************* Import node Modules ********************************* */
const mongoose = require('mongoose');

/* ********************************* Import Local Modules ********************************* */
const DB = require('../dbConnection');

const userSchema = mongoose.Schema({

    id_contract: { type: mongoose.Schema.Types.ObjectId },
    code: { type: String, index: { unique: true }, required: true },
    name: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], defualt: 'Active' },
    role: { type: String, enum: ['Company', 'Vendor', 'Customer'] },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, select: false, required: true },
    created_at: { type: Date, default: Date.now },
    created_by: { type: mongoose.Schema.Types.ObjectId, },
    last_modified_at: { type: Date },
    last_modified_by: { type: mongoose.Schema.Types.ObjectId, }

});

module.exports = DB.model('Users', userSchema);