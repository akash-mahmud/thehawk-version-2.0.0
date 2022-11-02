import expressAsyncHandler  from "express-async-handler";
import SubCategory from "../Model/subCategory.js";
import Post from '../Model/postModel.js';


  const addSubCategory = expressAsyncHandler(async (req, res) => {
    const subCategory = new SubCategory({
      subCategoryName: req.body.title,
      category: req.body.category,
      categoryId: req.body.categoryId,
      subCategoryPageTitle:req.body.pageTitle,
      subCategoryPageKeyWords:req.body.pageKeywords,
      subCategoryText: req.body.text.trim()
    });
  
    await subCategory.save();
    res.send("success");
  });
  const getSubCategory = expressAsyncHandler(async (req, res) => {
    const subCategory = await SubCategory.find();
  
    if (subCategory) {
      res.send(subCategory);
    } else {
      res.status(403).send("Nothing");
    }
  });
  const singleSubCategory = expressAsyncHandler(async (req, res) => {
    const subCategory = await SubCategory.find({ _id: req.params.id });
    if (req.query.page) {
      const skippedNumber = parseInt(req.query.page);
      const postData = await Post.find({ 'subCategory.id': req.params.id })
        .sort({ $natural: -1 })
        .skip((skippedNumber - 1) * 5)
        .limit(5);


      res.send(postData);
    } else {
      res.send(subCategory);
    }
  });
  const editSubCategory = async (req, res) => {
    const filter = await SubCategory.findOne({ _id: req.params.id });
  
    const updateSubCategory = {
      subCategoryName: req.body.title,
      category: req.body.category,
      categoryId: req.body.categoryId,
      subCategoryPageTitle:req.body.pageTitle,
      subCategoryPageKeyWords:req.body.pageKeywords,
      subCategoryText: req.body.text.trim()
    };
    let doc = await SubCategory.updateOne(filter, updateSubCategory);
    if (doc) {
      res.send(doc);
    }
  };
  
  const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    const filteredSubCategory = await SubCategory.findById(req.params.id);
    if (filteredSubCategory) {
      const deletefilteredSubCategory = await filteredSubCategory.remove();
      res.send({ message: "Post Deleted", Rss: deletefilteredSubCategory });
    } else {
      res.status(404).send({ message: "Rss Not Found" });
    }
  });
  


export {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  editSubCategory,
  singleSubCategory,
};