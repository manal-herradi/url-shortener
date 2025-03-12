const mongoose = require('mongoose');
const shortid = require('shortid');

const ShortUrlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    lastClicked: {
        type: Date
    },
    expirationDate: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
