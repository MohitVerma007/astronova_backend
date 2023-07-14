import express from "express";

// import controllers
import {
  getbyid,
  getUserController,
  getsingleUserController,
} from "../controllers/userController.js";

//router object
const router = express.Router();

//routes

// GET USERS || GET
router.get("/get-all-user", getUserController);

// GET Single USER || GET
router.get("/get-single-user", getsingleUserController);

// get by id
router.get("/:id", getbyid);

export default router;
