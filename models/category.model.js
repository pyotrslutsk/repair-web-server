const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  prices: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaKeywords: {
    type: String,
  },
  ogImage: {
    type: String,
  },
  ogTitle: {
    type: String,
  },
  ogDescription: {
    type: String,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
