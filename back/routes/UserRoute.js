const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/UserController");

router.post("/signup", asyncHandler(userCtrl.signup));
router.post("/login", asyncHandler(userCtrl.login));
router.get("/account", auth, asyncHandler(userCtrl.account));

module.exports = router;
