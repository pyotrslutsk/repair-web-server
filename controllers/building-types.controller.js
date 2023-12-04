const BuildingTypes = require("../models/building-types.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgw2edeqq", // process.env.CLOUD_NAME,
  api_key: "149627141151715", // process.env.CLOUDINARY_KEY,
  api_secret: "ax6shlY_f2Qd4_kFUDGT6SqHoBg", // process.env.CLOUDINARY_APP_SECRET,
});

const getAllBuildingTypes = async (req, res) => {
  try {
    const buildingTypes = await BuildingTypes.find({});
    console.log(buildingTypes);
    res.json(buildingTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBuildingTypeById = async (req, res) => {
  try {
    const buildingType = await BuildingTypes.findById(req.params.id);
    res.json(buildingType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBuildingType = async (req, res) => {
  // try {
  const uploadedImages = await Promise.all(
    req.files["photo[]"].map(async (file) => {
      if (file.mimetype !== "application/pdf") {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI);
        return result.secure_url;
      }
    })
  );

  const uploadedFiles = await Promise.all(
    req.files["file[]"].map(async (file) => {
      if (file.mimetype === "application/pdf") {
        const b64 = Buffer.from(file.buffer).toString("base64");
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        const result = await cloudinary.uploader.upload(dataURI);
        return result.secure_url;
      }
    })
  );

  // Save data to MongoDB
  const buildingType = new BuildingTypes({
    name: req.body.name,
    photo: uploadedImages,
    description: req.body.description,
    file: uploadedFiles,
    title: req.body.title,
    slug: req.body.slug,
    metaDescription: req.body.metaDescription,
    metaKeywords: req.body.metaKeywords,
    ogImage: req.body.ogImage,
    ogTitle: req.body.ogTitle,
    ogDescription: req.body.ogDescription,
  });

  await buildingType.save();

  res.status(200).json({ message: "Item successfully uploaded and saved." });
  // } catch (error) {
  //   res.status(500).json({ error: "Internal server error." });
  // }
};

const updateBuildingType = async (req, res) => {
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
    const buildingType = await BuildingTypes.findById(req.params.id);

    buildingType.name = req.body.name;
    buildingType.photo = uploadedImages;
    buildingType.description = req.body.description;
    buildingType.file = uploadedImages;
    buildingType.metaDescription = req.body.metaDescription;
    buildingType.metaKeywords = req.body.metaKeywords;
    buildingType.ogImage = req.body.ogImage;
    buildingType.ogTitle = req.body.ogTitle;
    buildingType.ogDescription = req.body.ogDescription;

    await buildingType.save();

    res.status(200).json({ message: "Item successfully updated and saved." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteBuildingType = async (req, res) => {
  try {
    const buildingType = await BuildingTypes.findById(req.params.id);
    await buildingType.remove();
    res.status(200).json({ message: "Item successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAllBuildingTypes,
  getBuildingTypeById,
  createBuildingType,
  updateBuildingType,
  deleteBuildingType,
};
