const express = require("express");
const router = express.Router();
const {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
} = require("../controllers/documentController");

const { protect } = require("../middleware/authMiddleware");

router.post("/:collectionId/documents", protect, createDocument);
router.get("/:collectionId/documents", protect, getDocuments);
router.get("/:collectionId/documents/:documentId", protect, getDocumentById);
router.put("/:collectionId/documents/:documentId", protect, updateDocument);
router.delete("/:collectionId/documents/:documentId", protect, deleteDocument);

module.exports = router;
