import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

import upload from "../middlewares/uploadMiddleware.js";
/*
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("profileImg");
*/

// router object
const router = express.Router();

// Register || Post
router.post(
  "/register",
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  registerController
);

// Login || Get
router.post("/login", loginController);

// export
export default router;
