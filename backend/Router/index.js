import express  from "express";
import {deleteCategory ,editCategory ,singleCategory, getCategory,addCategory, migrateData, getSideBarPost }  from "../Controller/category.js";
import {addRss,getRss ,allRss ,editRss,deleteRss}  from "../Controller/RssController.js";
import {
  addPost,
  findMedia,
  singlPOst,
  getPost,
  getLimited,
  deletePost,
  editPost,
  galleryIndex,
  mostRecomndedNews,
  getBreakingNews,

} from '../Controller/PostController.js';
import {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  singleSubCategory,editSubCategory,
} from '../Controller/subCategory.js';
import {register,login ,users ,editUser,me ,logout,userDelete, adminregister, refresh, user}  from "../Controller/UserController.js";
import authenticate  from "../Middleware/authenticate.js";
import { backUpDownload, restoreBackUp } from "../Controller/backupAndRestoreController.js";
import auth from "../Middleware/auth.js";
const passportLocal = require("../Middleware/pasportLocal");

const router = express.Router();
 
//Post Routes
router.post("/api/user/register", register);
router.post("/api/refresh", refresh);
router.post('/api/user/admin/register', adminregister);
router.post("/user",passportLocal.authenticate('local') ,login);
// router.get("/user" , auth ,user);
router.post('/api/post', addPost);
router.post('/api/media', findMedia);
router.post('/api/restore/backup', restoreBackUp);
router.post('/api/restore/download', backUpDownload);
 
router.post('/api/category', addCategory);
router.post('/api/category/seed', migrateData);
router.post('/api/subCategory', addSubCategory);

router.post('/api/rss_feed', addRss);

//Get Routes
// router.get('/api/logout', logout);
// router.get('/api/media', searchForMedia);
router.get('/api/user/me', auth, user);
router.get('/api/user/me/logout', auth, logout);
router.get('/api/user', users);
router.get('/api/category', getCategory);
router.get('/api/category/:id', singleCategory);
router.get("/api/category/sidebar/:id", getSideBarPost);
router.get('/api/post', getPost);

router.get("/api/post/galleryIndex", galleryIndex);
router.get("/api/post/mostrecomanded", mostRecomndedNews);
router.get("/api/post/breaking", getBreakingNews);

router.get('/api/post/:posttype', getLimited);
router.get('/api/singlepost/:id', singlPOst);
router.get('/api/subCategory', getSubCategory);
router.get('/api/subCategory/:id', singleSubCategory);
router.get('/api/rss/all', allRss);
router.get('/api/rss/:id', getRss);

//Pathch Routes
router.patch('/api/post/:id', editPost);
router.patch("/api/user/:id",editUser);
router.patch("/api/category/:id", editCategory);
router.patch("/api/subCategory/:id", editSubCategory);
router.patch("/api/rss/:id", editRss);

////Delete Routes
router.delete('/api/post/:id', deletePost);
router.delete("/api/user/:id",userDelete);
router.delete("/api/category/:id", deleteCategory);
router.delete("/api/subCategory/:id", deleteSubCategory);
router.delete("/api/rss/:id", deleteRss);

export default router;
