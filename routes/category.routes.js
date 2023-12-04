const express = require("express");
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const categoryRouter = express.Router();

categoryRouter.get("/api/categories", getAllCategories);
categoryRouter.get("/api/categories/:id", getCategoryById);
categoryRouter.post(
  "/api/categories",
  upload.array("photo[]", 10),
  createCategory
);
categoryRouter.patch("/api/categories/:id", updateCategory);
categoryRouter.delete("/api/categories/:id", deleteCategory);

module.exports = categoryRouter;
