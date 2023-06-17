const express = require("express");
const tokenVerification = require("../middleware/tokenVerification");
const {
  getAllInvoices,
  createInvoice,
} = require("../controllers/invoiceController");
const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    message: "Simple Invoice API: invoice routes",
  });
});
router.use(tokenVerification);
router.get("/getAllInvoices", getAllInvoices);
router.post("/create", createInvoice);
module.exports = router;
