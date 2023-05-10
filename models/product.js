const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  category: {
    type: String,
    require: true,
  },
  images: [
    {
      type: String,
    },
  ],
  long_desc: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  short_desc: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
