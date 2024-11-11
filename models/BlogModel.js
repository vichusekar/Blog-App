const mongoose = require("mongoose")

let blogSchema = new mongoose.Schema({

    title: { type: String, required: true },

    imageURL: { type: String, required: true },

    description: { type: String, required: true },

    author: { type: String, required: true },

    createdAt: { type: Date, default: () => new Date(new Date().toDateString()) },

    id: { type: mongoose.SchemaTypes.ObjectId },

}, { collection: "blogs", versionKey: false })

let BlogModel = mongoose.model("blogs", blogSchema)

module.exports = BlogModel
