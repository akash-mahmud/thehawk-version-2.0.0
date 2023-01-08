import express from "express";
import { addPost, deletePost, editPost, galleryIndex, getBreakingNews, getLimited, getPost, mostRecomndedNews } from "../Controller/PostController";


const postRouter = express.Router();
postRouter.get("/", getPost);
postRouter.get("/galleryIndex", galleryIndex);
postRouter.get("/mostrecomanded", mostRecomndedNews);
postRouter.get("/breaking", getBreakingNews);
postRouter.get("/:posttype", getLimited);
postRouter.patch("/:id", editPost);
postRouter.delete("/:id", deletePost);
postRouter.post("/", addPost);
export default postRouter;
