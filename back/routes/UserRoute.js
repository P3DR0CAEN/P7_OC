const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const multerMiddleware = require("../middleware/multer-traitement");

const userSignup = require("../controllers/user.signup");
const userLogin = require("../controllers/user.login");
const userGetAccount = require("../controllers/user.get.account");
const userUpdateAccount = require("../controllers/user.update.account");

router.post("/signup", multerMiddleware, asyncHandler(userSignup));
router.post("/login", asyncHandler(userLogin));
router.get("/account", auth, asyncHandler(userGetAccount));
router.put("/account", auth, multerMiddleware, asyncHandler(userUpdateAccount));

module.exports = router;
