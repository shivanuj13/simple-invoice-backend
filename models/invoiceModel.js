const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    customerName: String,
    customerAddress: String,
    mobile: String,
    createdBy: String,
    itemList: [],
  },
  { timestamps: true }
);

const invoiceModel = mongoose.model("invoice", invoiceSchema);
module.exports = invoiceModel;
