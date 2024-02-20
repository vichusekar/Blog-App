const mongoose = require('mongoose')

let blogSchema = new mongoose.Schema({

    title: { type: String, required: true },

    imageUrl: { type: String },

    description: { type: String, required: true },

    id: { type: mongoose.SchemaTypes.ObjectId }

}, { collection: 'createblogs', versionKey: false })

let blogModel = mongoose.model('createblogs', blogSchema)

module.exports = blogModel
