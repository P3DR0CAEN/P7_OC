const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const multerMiddleware = require("../middleware/multer-traitement");

const userSignup = require("../controllers/user/user.signup");
const userLogin = require("../controllers/user/user.login");
const userGetAccount = require("../controllers/user/user.get.account");
const userUpdateAccount = require("../controllers/user/user.update.account");
const userGetProfil = require("../controllers/user/user.get.profil");

router.post("/signup", multerMiddleware("users"), asyncHandler(userSignup));
router.post("/login", asyncHandler(userLogin));
router.get("/account", auth, asyncHandler(userGetAccount));
router.put(
    "/account",
    auth,
    multerMiddleware("users"),
    asyncHandler(userUpdateAccount)
);
router.get("/profil/:id", auth, asyncHandler(userGetProfil));
router.get("/profil", auth, asyncHandler(userGetProfil));

module.exports = router;
