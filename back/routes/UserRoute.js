const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const auth = require("../middleware/auth");

const multerMiddleware = require("../middleware/multer-traitement");

const userSignup = require("../controllers/user/user.signup");
const userLogin = require("../controllers/user/user.login");

const userGetAccount = require("../controllers/user/user.get.profil");
const userUpdateAccount = require("../controllers/user/user.update.account");

const userGetProfil = require("../controllers/user/user.get.profil");
const userGetPost = require("../controllers/post/post.get.user");

router.post("/signup", multerMiddleware("users"), asyncHandler(userSignup));
router.post("/login", asyncHandler(userLogin));
router.get("/account", auth, asyncHandler(userGetAccount));
router.put(
    "/account",
    auth,
    multerMiddleware("users"),
    asyncHandler(userUpdateAccount)
);
router.get("/getProfil/:id", auth, asyncHandler(userGetProfil));
router.get("/getProfil", auth, asyncHandler(userGetProfil));
router.get("/getPosts/:id", auth, asyncHandler(userGetPost));
router.get("/getPosts", auth, asyncHandler(userGetPost));

module.exports = router;
