const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let path;
        if (req.body.UploadDestination == "users") {
            path = "images/users/";
        } else {
            path = "images/posts/";
        }
        callback(null, path);
    },
    filename: function (req, file, callback) {
        let name = undefined;
        if (req.body.UploadDestination == "users") {
            name = "PP_" + req.userId;
        } else {
            name = "Post_" + Date.now();
        }
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

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single(
    "image"
);
