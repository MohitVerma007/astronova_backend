import express from "express";
import {
  getbyid,
  getUserController,
  getsingleUserController,
  updateUserController,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

//router object
const router = express.Router();

//routes
// GET USERS || GET
router.get("/get-user", getUserController);

// GET Single USER || GET
router.get("/get-single-user", getsingleUserController);

// UPDATE USER || PUT
router.put(
  "/update-user",
  userAuth,
  upload.fields([
    { name: "profileImg", maxCount: 1 },
    { name: "coverImg", maxCount: 1 },
  ]),
  updateUserController
);

// get by id
router.get("/:id", getbyid);

export default router;
