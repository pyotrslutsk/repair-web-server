const mongoose = require("mongoose");

const buildingTypesSchema = new mongoose.Schema({
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
  file: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
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

const BuildingTypes = mongoose.model("BuildingTypes", buildingTypesSchema);

module.exports = BuildingTypes;
