const Document = require("../models/Document");
const Collection = require("../models/Collection");

// Helper to validate document against schema
function validateAgainstSchema(docData, schema) {
  for (let field in schema) {
    const type = schema[field];
    if (!(field in docData)) return false;
    const value = docData[field];

    if (
      (type === "String" && typeof value !== "string") ||
      (type === "Number" && typeof value !== "number") ||
      (type === "Boolean" && typeof value !== "boolean") ||
      (type === "Date" && isNaN(Date.parse(value))) ||
      (type === "Array" && !Array.isArray(value)) ||
      (type === "JSON" && typeof value !== "object")
    ) {
      return false;
    }
  }
  return true;
}


exports.createDocument = async (req, res) => {
  const { collectionId } = req.params;
  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    
    if (collection.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const isValid = validateAgainstSchema(req.body, collection.schema);
    if (!isValid) return res.status(400).json({ message: "Invalid data format" });

    const doc = await Document.create({
      user: req.user.userId,
      collectionId,
      data: req.body,
    });

    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getDocuments = async (req, res) => {
  const { collectionId } = req.params;
  const { page = 1, limit = 10, sortBy = "createdAt", order = "asc", ...filters } = req.query;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    if (collection.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    const query = {
      user: req.user.userId,
      collectionId,
      ...Object.keys(filters).reduce((acc, key) => {
        acc[`data.${key}`] = filters[key];
        return acc;
      }, {}),
    };

    const docs = await Document.find(query)
      .sort({ [`data.${sortBy}`]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getDocumentById = async (req, res) => {
  const { collectionId, documentId } = req.params;
  try {
    const doc = await Document.findOne({
      _id: documentId,
      collectionId,
      user: req.user.userId,
    });

    if (!doc) return res.status(404).json({ message: "Document not found" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateDocument = async (req, res) => {
  const { collectionId, documentId } = req.params;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection || collection.user.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized or collection not found" });

    const isValid = validateAgainstSchema(req.body, collection.schema);
    if (!isValid) return res.status(400).json({ message: "Invalid data format" });

    const updated = await Document.findOneAndUpdate(
      { _id: documentId, user: req.user.userId },
      { data: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Document not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteDocument = async (req, res) => {
  const { collectionId, documentId } = req.params;

  try {
    const doc = await Document.findOneAndDelete({
      _id: documentId,
      collectionId,
      user: req.user.userId,
    });

    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
