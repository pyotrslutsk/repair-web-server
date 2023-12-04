const express = require("express");
const multer = require("multer");
const buildingTypesController = require("../controllers/building-types.controller");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
});

const buildingTypesRouter = express.Router();

buildingTypesRouter.get(
  "/api/building-types",
  buildingTypesController.getAllBuildingTypes
);
buildingTypesRouter.get(
  "/api/building-types/:id",
  buildingTypesController.getBuildingTypeById
);
buildingTypesRouter.post(
  "/api/building-types",
  upload.fields([
    { name: "photo[]", maxCount: 10 },
    { name: "file[]", maxCount: 1 },
  ]),
  buildingTypesController.createBuildingType
);
buildingTypesRouter.put(
  "/api/building-types/:id",
  buildingTypesController.updateBuildingType
);
buildingTypesRouter.delete(
  "/api/building-types/:id",
  buildingTypesController.deleteBuildingType
);

module.exports = buildingTypesRouter;
