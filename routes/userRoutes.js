const express = require("express");
const router = express.Router();
const { signUp, signIn, update } = require("../controllers/userController");
const tokenVerification = require("../middleware/tokenVerification");

router.get("/", (req, res) => {
  res.json({
    message: "Simple Invoice API: user routes",
  });
});

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/update", tokenVerification, update);
module.exports = router;
