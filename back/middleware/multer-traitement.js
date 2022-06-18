const multer = require("./multer-config");

multerMiddleware = function (req, res, next) {
    multer(req, res, function (err) {
        if (err) {
            return res.status(500).json("Veuillez upload un fichier image");
        }
        // Everything went fine.
        return next();
    });
};

module.exports = multerMiddleware;
