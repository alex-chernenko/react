const mongoose = require('mongoose');

const Recipe = new mongoose.Schema({
	title: String,
	description: String,
	createdAt: String,
	updatedAt: String,
	rating: String
}, {
	versionKey: false
});

module.exports = mongoose.model('Recipe', Recipe);
