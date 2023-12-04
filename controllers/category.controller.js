const Category = require("../models/category.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgw2edeqq", // process.env.CLOUD_NAME,
  api_key: "149627141151715", // process.env.CLOUDINARY_KEY,
  api_secret: "ax6shlY_f2Qd4_kFUDGT6SqHoBg", // process.env.CLOUDINARY_APP_SECRET,
});

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI);
        return result.secure_url;
      })
    );

    // Save data to MongoDB
    const category = new Category({
      name: req.body.name,
      photo: uploadedImages,
      description: req.body.description,
      prices: req.body.prices,
      title: req.body.title,
      metaDescription: req.body.metaDescription,
      metaKeywords: req.body.metaKeywords,
      ogImage: req.body.ogImage,
      ogTitle: req.body.ogTitle,
      ogDescription: req.body.ogDescription,
    });

    await category.save();

    res.status(200).json({ message: "Item successfully uploaded and saved." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      category.name = req.body.name || category.name;
      category.photo = req.body.photo || category.photo;
      category.description = req.body.description || category.description;
      category.prices = req.body.prices || category.prices;
      category.title = req.body.title || category.title;
      category.metaDescription =
        req.body.metaDescription || category.metaDescription;
      category.metaKeywords = req.body.metaKeywords || category.metaKeywords;
      category.ogImage = req.body.ogImage || category.ogImage;
      category.ogTitle = req.body.ogTitle || category.ogTitle;
      category.ogDescription = req.body.ogDescription || category.ogDescription;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.deleteOne({ _id: req.params.id });
      res.json({ message: "Category removed" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
