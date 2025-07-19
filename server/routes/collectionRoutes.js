const express = require("express");
const router = express.Router();
const {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

const { protect } = require("../middleware/authMiddleware"); // make sure you have this

router.route("/")
  .post(protect, createCollection)
  .get(protect, getCollections);

router.route("/:id")
  .get(protect, getCollectionById)
  .put(protect, updateCollection)
  .delete(protect, deleteCollection);

module.exports = router;
