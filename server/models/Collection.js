const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  schema: { type: Object, required: true },
});

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionSchema);
module.exports = Collection;
