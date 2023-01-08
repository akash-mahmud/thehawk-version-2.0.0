import express from "express";
import { addCategory, deleteCategory, editCategory, getCategory, getSideBarPost, migrateData, singleCategory } from "../Controller/category";


const categoryRouter = express.Router();
categoryRouter.get("/", getCategory);
categoryRouter.get("/:id", singleCategory);
categoryRouter.get("/sidebar/:id", getSideBarPost);
categoryRouter.patch("/:id", editCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.post("/seed", migrateData);
categoryRouter.post("/", addCategory);

export default categoryRouter;
