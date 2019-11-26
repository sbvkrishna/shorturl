const mongoose = require('mongoose');

const ShorturlSchema = mongoose.Schema({
	originalURL: String,
	shortURL: String
})

module.exports = mongoose.model('Shorturl', ShorturlSchema);