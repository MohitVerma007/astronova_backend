import multer from "multer";

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File filteration: Only png/jpeg

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "profileImg") {
    file.mimetype === "image/jpeg" || file.mimetype === "image/png"
      ? cb(null, true)
      : cb(null, false);
  } else if (file.fieldname === "coverImg") {
    file.mimetype === "image/jpeg" || file.mimetype === "image/png"
      ? cb(null, true)
      : cb(null, false);
  }
};

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
