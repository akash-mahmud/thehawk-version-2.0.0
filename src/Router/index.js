import express from "express";

import {
  addRss,
  getRss,
  allRss,
  editRss,
  deleteRss,
} from "../Controller/RssController.js";
import { findMedia, singlPOst } from "../Controller/PostController.js";

import { refresh } from "../Controller/UserController.js";

import {
  backUpDownload,
  restoreBackUp,
} from "../Controller/backupAndRestoreController.js";

import { createPool, getCurrentPool } from "../Controller/pool.js";
import {
  createSiteInfo,
  getSiteInfo,
  updateSiteInfo,
} from "../Controller/siteinfo.js";
import { sendEmail } from "../Controller/email.js";
import { subscribe } from "../Controller/subscribe.js";
import userRouter from "./user.js";
import postRouter from "./post.js";
import categoryRouter from "./category.js";
import subCategoryRouter from "./subcategory.js";
const passportLocal = require("../Middleware/pasportLocal");

const router = express.Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);

//Post Routes

router.post("/refresh", refresh);
router.post("/pool", createPool);
router.post("/siteinfo", createSiteInfo);

// router.get("/user" , auth ,user);

router.post("/subscribe", subscribe);
router.post("/media", findMedia);
router.post("/restore/backup", restoreBackUp);
router.post("/restore/download", backUpDownload);

router.post("/email", sendEmail);

router.post("/rss_feed", addRss);

//Get Routes
// router.get('/logout', logout);
// router.get('/media', searchForMedia);

router.get("/pool", getCurrentPool);
router.get("/siteinfo", getSiteInfo);

router.get("/singlepost/:id", singlPOst);

router.get("/rss/all", allRss);
router.get("/rss/:id", getRss);

//Pathch Routes

router.patch("/siteinfo", updateSiteInfo);

router.patch("/rss/:id", editRss);

////Delete Routes

router.delete("/rss/:id", deleteRss);

export default router;
