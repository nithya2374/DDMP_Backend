const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Collection" },
  data: { type: Object, required: true },
});

module.exports = mongoose.model("Document", documentSchema);
