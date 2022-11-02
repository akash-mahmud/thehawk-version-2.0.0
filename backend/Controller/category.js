import expressAsyncHandler from 'express-async-handler';
import Category from '../Model/categoryJs.js';
import fs from 'fs';
import Parser from 'rss-parser';
let parser = new Parser();
import data from '../../data.json';
import Post from '../Model/postModel.js';
const addCategory = expressAsyncHandler(async (req, res) => {
  if (req.body.blueSection === true) {
    const filter = await Category.findOne({ isblueSection: true });
    if (filter) {
      const updatePost = {
        isblueSection: false,
      };
      const data = await Category.updateOne(filter, updatePost);
    }
  }
  const category = new Category({
    category: req.body.title.trim(),
    categoryPageTitle: req.body.pageTitle,
    categoryPageKeyWords: req.body.pageKeywords,
    categoryText: req.body.text.trim(),
    categoryImg: req.body.image,
    addTop: req.body.addTop,
    addToMenu: req.body.addToMenu,
    addToComminSection: req.body.addToComminSection,
    isGridSection: req.body.isGridSection,
    isPlainSection: req.body.isPlainSection,
    gridWithWizard: req.body.gridWithWizard,
    coloumnWithWizard: req.body.coloumnWithWizard,
    isblueSection: req.body.blueSection,
    isVideoSection: req.body.isVideoSection,
  });

  await category.save();
  res.send('success');
});

const getCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.find();

  if (category) {
    res.send(category);
  } else {
    res.status(403).send('Nothing');
  }
});

const editCategory = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    //
    // if (req.body.blueSection === true) {
    //
    //
    //   const filter = await Category.findOne({ isblueSection: true });
    //   if (filter) {
    //
    //     const updatePost = {
    //       isblueSection: false,
    //     };
    //     const data = await Category.updateOne(filter, updatePost);
    //   }
    // }

    const updatedCategory = {
      category: req.body.title.trim(),
      categoryPageTitle: req.body.pageTitle,
      categoryPageKeyWords: req.body.pageKeywords,
      categoryText: req.body.text.trim(),
      categoryImg: req.body.image,
      addTop: req.body.addTop,
      addToMenu: req.body.addToMenu,
      addToComminSection: req.body.addToComminSection,
      isGridSection: req.body.isGridSection,
      isPlainSection: req.body.isPlainSection,
      gridWithWizard: req.body.gridWithWizard,
      coloumnWithWizard: req.body.coloumnWithWizard,
      isblueSection: req.body.blueSection,
      isVideoSection: req.body.isVideoSection,
    };
    let doc = await Category.findOneAndUpdate(filter, updatedCategory);
    if (doc) {
      res.send(doc);
    }
  } catch (error) {}
};

const singleCategory = expressAsyncHandler(async (req, res) => {
  const category = await Category.find({ _id: req.params.id });
  if (req.query.page) {
    const skippedNumber = parseInt(req.query.page);
    const postData = await Post.find({ 'category.id': req.params.id })
      .sort({ $natural: -1 })
      .skip((skippedNumber - 1) * 20)
      .limit(20);

    
        res.send(postData);

  } else {
    res.send(category);
  }
});
const deleteCategory = expressAsyncHandler(async (req, res) => {
  const deletedFilteredCategory = await Category.findById(req.params.id);
  if (deletedFilteredCategory) {
    const deletedCategory = await deletedFilteredCategory.remove();
    res.send({ message: 'Post Deleted', category: deletedCategory });
  } else {
    res.status(404).send({ message: 'Category Not Found' });
  }
});

const migrateData = expressAsyncHandler(async (req, res) => {
  const { url, catName, catId, authorName, authorId, count } = req.body;

  let pageNumber = 1;
  let posts = [];

  for (let index = 0; index <= count; index++) {
    const parsedData = await parser.parseURL(`${url}/?page=${pageNumber}`);



    (posts = [
      ...posts,
      ...parsedData.items.map((data) => {
        return {
          postitle: data.title,
          postText: data.content,
          description: data['content:encoded'],
          img: 'https://res.cloudinary.com/thehawk/image/upload/v1647778416/etg05xddcvjn1hacsuyz.jpg',
          author: {
            name: authorName,
            id: authorId,
          },
          category: {
            name: catName,
            id: catId,
          },
          subCategory: {
            name: '',
            id: '',
          },
          pageTitle: data.title,
          pageDescription: data.content,
        };
      }),
    ]),
      (pageNumber = pageNumber + 1);
    //  }
  }

await Post.insertMany(posts);


  res.send('Success');
});


const getSideBarPost = expressAsyncHandler(async (req, res) => { 
  try {
    const { id } = req.params;
    let pageNumber = req.query.page;
    if (pageNumber) {
      pageNumber = parseInt(pageNumber);
    } else {
      pageNumber= 0
    }
    let limit = 20
    
    if (req.query.limit) {
      limit = parseInt(req.query.limit);
    }
    const posts = await Post.find({ "category.id": { $ne: id } })
      .sort({
        $natural: -1,
      })
      .skip(Math.abs(pageNumber - 1) * 20)
      .limit(limit);
    
    return res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }


})

export {
  deleteCategory,
  singleCategory,
  editCategory,
  getCategory,
  addCategory,
  migrateData,
  getSideBarPost,

};
