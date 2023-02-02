const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreItemSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const StoreItem = mongoose.model("Storeitems", StoreItemSchema);

module.exports = StoreItem;
