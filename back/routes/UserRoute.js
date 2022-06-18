const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/UserController");

const multerMiddleware = function (req, res, next) {
    multer(req, res, function (err) {
        if (err) {
            return res.status(500).json("Veuillez upload un fichier image");
        }
        // Everything went fine.
        return next();
    });
};

router.post("/signup", multerMiddleware, asyncHandler(userCtrl.signup));
router.post("/login", asyncHandler(userCtrl.login));
router.get("/account", auth, asyncHandler(userCtrl.getAccount));
router.put(
    "/account",
    auth,
    multerMiddleware,
    asyncHandler(userCtrl.updateAccount)
);

module.exports = router;
