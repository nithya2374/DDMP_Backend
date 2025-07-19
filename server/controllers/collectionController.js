const Collection = require("../models/collection");


exports.createCollection = async (req, res) => {
  try {
    const { name, schema } = req.body;

    const collection = new Collection({
      user: req.user._id,
      name,
      schema,
    });

    const saved = await collection.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user: req.user._id });
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(collection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateCollection = async (req, res) => {
  try {
    const { name, schema } = req.body;

    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    collection.name = name || collection.name;
    collection.schema = schema || collection.schema;

    const updated = await collection.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    if (collection.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await collection.deleteOne();
    res.json({ message: "Collection deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
