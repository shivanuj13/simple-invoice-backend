const invoiceModel = require("../models/invoiceModel");
const { countDocuments } = require("../models/userModel");
const getAllInvoices = async (req, res, next) => {
  try {
    const id = req.id;
    const invoices = await invoiceModel.find({ createdBy: id });
    return res.json({
      status: true,
      data: invoices,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const createInvoice = async (req, res, next) => {
  try {
    const createdBy = req.id;
    const { customerName, customerAddress, mobile, itemList } = req.body;
    const invoice = await invoiceModel.create({
      customerName,
      customerAddress,
      createdBy,
      mobile,
      itemList,
    });
    res.json({
      status: true,
      data: invoice,
      error: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllInvoices, createInvoice };
