const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const ArchiveSchema = new Schema({
    me: {
        type: String,
        required: true,
        unique: false
    },
    them: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }
}, {
    timestamps: true
})

const Archives = mongoose.model("Archives", ArchiveSchema);

module.exports = Archives;