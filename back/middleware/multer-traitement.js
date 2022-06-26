const multer = require("./multer-config");

multerMiddleware = (namespace) =>
    function (req, res, next) {
        multer(namespace)(req, res, function (err) {
            if (err) {
                return res.status(500).json("Veuillez upload un fichier image");
            }
            // Everything went fine.
            return next();
        });
    };

module.exports = multerMiddleware;
