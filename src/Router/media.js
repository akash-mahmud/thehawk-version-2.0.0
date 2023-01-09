import express from "express";
import { uploadMultipleImgae, uploadSingleImage } from "../Controller/media";
import { findMedia } from "../Controller/PostController";
import upload from "../utils/multer";


const mediaRouter = express.Router();
mediaRouter.post("/single", upload.single("file"), uploadSingleImage);
mediaRouter.post("/multiple", uploadMultipleImgae);
mediaRouter.post("/", findMedia);

export default mediaRouter;
