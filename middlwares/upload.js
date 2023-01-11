const multer = require("multer");
const path = require("path");

const multerConfig = multer.diskStorage({
    destination: path.join(__dirname, "../", "temp"),
    filename: (req, file, cd) => {
        cd(null, file.originalname)
    },
})

const upload = multer({
    storage: multerConfig,
})

module.exports = upload;