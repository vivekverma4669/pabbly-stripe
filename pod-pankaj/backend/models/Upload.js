const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
