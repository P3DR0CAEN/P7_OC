const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

module.exports = (namespace) => {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, `images/${namespace}/`);
        },
        filename: function (req, file, callback) {
            const name =
                namespace == "users"
                    ? "PP_" + req.userId + "_" + Date.now()
                    : "Post_" + Date.now();
            const extension = MIME_TYPES[file.mimetype];
            callback(null, name + "." + extension);
        },
    });

    const fileFilter = function (req, file, cb) {
        // reject a file
        const authorizedMimeTypes = Object.keys(MIME_TYPES);

        if (authorizedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .jpeg or .png files are accepted"), false);
        }
    };
    return multer({ storage: storage, fileFilter: fileFilter }).single("image");
};
