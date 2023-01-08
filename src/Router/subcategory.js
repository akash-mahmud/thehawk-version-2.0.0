import express from "express";

import { addSubCategory, deleteSubCategory, editSubCategory, getSubCategory, singleSubCategory } from "../Controller/subCategory";

const subCategoryRouter = express.Router();
subCategoryRouter.delete("/:id", deleteSubCategory);
subCategoryRouter.patch("/:id", editSubCategory);
subCategoryRouter.get("/", getSubCategory);
subCategoryRouter.get("/:id", singleSubCategory);
subCategoryRouter.post("/", addSubCategory);
export default subCategoryRouter;
