import Post from '../Model/postModel.js';
import expressAsyncHandler from 'express-async-handler';
import FB from 'fb';
import axios from 'axios';
import Category from '../Model/categoryJs.js';
import slugify from 'slugify';
const addPost = expressAsyncHandler(async (req, res) => {
  const catId = req.body.categoryId;
  try {
    if (req.body.isFetauredTop === true) {
      const filter = await Post.findOne({ isFetauredTop: true });
      if (filter) {
        const updatePost = {
          isFetauredTop: false,
          isTopRight: true,
        };
        const data = await Post.updateMany(filter, updatePost);
      }
    }

    if (req.body.isFetaured === true) {
      const filter = await Post.findOne({
        isFetaured: true,
        'category.id': catId,
      });
      if (filter) {
        const updatePost = {
          isFetaured: false,
        };
        const data = await Post.updateMany(filter, updatePost);
      }
    }

    if (req.body.isFetauredTop === true) {
      const post = new Post({
        postitle: req.body.title,
        postText: req.body.text,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        isBreaking: req.body.isBreaking,

        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },
        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
      });

      const data = await post.save();
      if (data) {
        FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

        const body = req.body.title;

        FB.api(
          `${process.env.FACEBOOK_PAGE_CODE}/feed`,
          'post',
          {
            message: body,
            link: `https://thehawk.in/posts/${slugify(req.body.title)}/${
              data._id
            }`,
          },
          function (res) {
            if (!res || res.error) {
              return;
            }
          }
        );
      }
      res.send(data);
    } else {
      const post = new Post({
        postitle: req.body.title,
        postText: req.body.text,
        isBreaking: req.body.isBreaking,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },

        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
      });

      const data = await post.save();
      if (data) {
        FB.setAccessToken(process.env.FACEBOOK_ACCESS_TOKEN);

        const body = req.body.title;

        FB.api(
          `${process.env.FACEBOOK_PAGE_CODE}/feed`,
          'post',
          {
            message: body,
            link: `https://thehawk.in/posts/${slugify(req.body.title)}/${
              data._id
            }`,
          },
          function (res) {
            if (!res || res.error) {
              return console.log(res);
            }
          }
        );
      }
      res.send(data);
    }

    // res.send("success");
  } catch (error) {}
});
const getLimited = expressAsyncHandler(async (req, res) => {
  if (req.query.page && req.params.posttype === 'admin') {
    let pageNumber = parseInt(req.query.page);
    const allPost = await Post.find()
      .sort({
        $natural: -1,
      })
      .skip((pageNumber - 1) * 20)
      .limit(20);

    res.send(allPost);
  } else {
    const post = await Post.find()
      .sort({
        $natural: -1,
      })
      .limit(250);

    if (post) {
      res.send(post);
    } else {
      res.status(403).send('Nothing');
    }
  }
});
const getPost = expressAsyncHandler(async (req, res) => {
  if (req.query.page && req.query.posttype === 'admin') {
    let pageNumber = parseInt(req.query.page);
    const allPost = await Post.find()
      .sort({
        $natural: -1,
      })
      .skip((pageNumber - 1) * 20)
      .limit(20);

    res.send(allPost);
  } else if (req.query.search) {
    const post = await Post.find();
    console.log(post);
  } else {
    const post = await Post.find()
      .sort({
        $natural: -1,
      })
      .limit(250);

    if (post) {
      res.send(post);
    } else {
      res.status(403).send('Nothing');
    }
  }
});

const singlPOst = expressAsyncHandler(async (req, res) => {
  console.log('hi');
  const post = await Post.find({ _id: req.params.id });
  if (req.query.posttype === 'related') {
    const allPost = await Post.find({
      _id: { $ne: post[0]._id },
      'category.id': post[0].category.id,
    })
      .sort({
        $natural: -1,
      })
      .limit(8);

    res.send(allPost);
  } else {
    res.send({
      post,
    });
  }
});

const editPost = expressAsyncHandler(async (req, res) => {
  const catId = req.body.categoryId;
  const dataFilter = await Post.findOne({ _id: req.params.id });
  console.log(catId);
  if (req.body.isFetauredTop === true) {
    console.log(req.body.isFetauredTop);
    const filter = await Post.findOne({ isFetauredTop: true });
    console.log(filter);
    if (filter) {
      const updatePost = {
        isFetauredTop: false,
        isTopRight: true,
      };
      const data = await Post.updateMany(filter, updatePost);


      const updatedPost = {
        isBreaking: req.body.isBreaking,
        postitle: req.body.title,
        postText: req.body.text,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },
        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,
        isTopRight: false,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
        imgAlt: req.body.imgAlt,
      };

      let doc = await Post.updateOne(dataFilter, updatedPost);

      res.send(doc);
    } else {
      const updatedPost = {
        isBreaking: req.body.isBreaking,
        postitle: req.body.title,
        postText: req.body.text,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },
        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,
        isTopRight: false,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
        imgAlt: req.body.imgAlt,
      };

      let doc = await Post.updateOne(dataFilter, updatedPost);

      res.send(doc);
    }
  } else if (req.body.isFetaured === true) {
    console.log(req.body.isFetaured);
    const filter = await Post.findOne({
      isFetaured: true,
      'category.id': catId,
    });
 
    if (filter) {
      const updatePost = {
        isFetaured: false,
      };
      const data = await Post.updateMany(filter, updatePost);
      console.log(data);

      const updatedPost = {
        isBreaking: req.body.isBreaking,
        postitle: req.body.title,
        postText: req.body.text,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },
        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
        imgAlt: req.body.imgAlt,
      };

      let doc = await Post.updateOne(dataFilter, updatedPost);

      res.send(doc);
    } else {
      const updatedPost = {
        isBreaking: req.body.isBreaking,
        postitle: req.body.title,
        postText: req.body.text,
        subHeading: req.body.subHeading,
        description: req.body.description,
        img: req.body.image,
        imgAlt: req.body.imgAlt,
        author: {
          name: req.body.name,
          id: req.body._id,
          professionalName: req.body.professionalName,
        },
        category: {
          name: req.body.category,
          id: req.body.categoryId,
        },
        subCategory: {
          name: req.body.subCategory,
          id: req.body.subCategoryId,
        },
        isFetaured: req.body.isFetaured,
        isFetauredTop: req.body.isFetauredTop,
        isRight: req.body.isRight,

        isTrending: req.body.trend,
        isPopular: req.body.popular,

        socialShare: req.body.socialShare,

        pageTitle: req.body.pageTitle,
        pageDescription: req.body.pageDescription,
        keyWords: req.body.pageKeyWords,
        tags: req.body.pageTags,
        video: req.body.video,
        imgAlt: req.body.imgAlt,
      };

      let doc = await Post.updateOne(dataFilter, updatedPost);

      res.send(doc);
    }
  } else {
    const updatedPost = {
      isBreaking: req.body.isBreaking,
      postitle: req.body.title,
      postText: req.body.text,
      subHeading: req.body.subHeading,
      description: req.body.description,
      img: req.body.image,
      imgAlt: req.body.imgAlt,
      author: {
        name: req.body.name,
        id: req.body._id,
        professionalName: req.body.professionalName,
      },
      category: {
        name: req.body.category,
        id: req.body.categoryId,
      },
      subCategory: {
        name: req.body.subCategory,
        id: req.body.subCategoryId,
      },
      isFetaured: req.body.isFetaured,
      isFetauredTop: req.body.isFetauredTop,
      isRight: req.body.isRight,

      isTrending: req.body.trend,
      isPopular: req.body.popular,

      socialShare: req.body.socialShare,

      pageTitle: req.body.pageTitle,
      pageDescription: req.body.pageDescription,
      keyWords: req.body.pageKeyWords,
      tags: req.body.pageTags,
      video: req.body.video,
      imgAlt: req.body.imgAlt,
    };

    let doc = await Post.updateOne(dataFilter, updatedPost);

    res.send(doc);
  }
});

const deletePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    const deletePost = await post.remove();
    res.send({ message: 'Post Deleted', product: deletePost });
  } else {
    res.status(404).send({ message: 'Post Not Found' });
  }
});

const findMedia = expressAsyncHandler(async (req, res) => {
  console.log(req.headers.host);
  const data = await Post.find(
    { imgAlt: { $regex: req.query.search } },
    {
      description: 0,
      postitle: 0,
      author: 0,
      category: 0,
      subCategory: 0,
      _id: 0,
      postText: 0,
      subHeading: 0,
      isFetaured: 0,
      isFetauredTop: 0,
      isRight: 0,
      isTrending: 0,
      isPopular: 0,
      isTopRight: 0,
      tags: 0,
      keyWords: 0,
      pageTitle: 0,
      pageDescription: 0,
      socialShare: 0,
      video: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    }
  );

  res.status(200).send(data);
  // {
  //   $or: [
  //     { name: { $regex: req.query.search } },
  //     { description: { $regex: req.query.search } },
  //   ];
  // }
});


const galleryIndex = expressAsyncHandler(async(req , res) => {
try {
  const post = await Post.find(
    {},
    {
      description: 0,

      author: 0,
      category: 0,
      subCategory: 0,

      postText: 0,
      subHeading: 0,
      isFetaured: 0,
      isFetauredTop: 0,
      isRight: 0,
      isTrending: 0,
      isPopular: 0,
      isTopRight: 0,
      tags: 0,
      keyWords: 0,
      pageTitle: 0,
      pageDescription: 0,
      socialShare: 0,
      video: 0,

      updatedAt: 0,
      __v: 0,
    }
  )
    .sort({
      $natural: -1,
    })
    .limit(12);
  return res.json({
    post,
  });
} catch (error) {
    return res.json({
      message: error.message,
    });
}
})

const getBreakingNews = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.find({
      isBreaking:true,
    })
      .sort({
        $natural: -1,
      })
      .limit(10);
      return res.json({
        post,
      });
    
  } catch (error) {
        return res.json({
          message: error.message,
        });
  }
});

const mostRecomndedNews = expressAsyncHandler(async (req, res) => {
  try {
    const post = await Post.find({
      isTopRight: true,
    })
      .sort({
        $natural: -1,
      })
      .limit(4); 
    ;
          return res.json({
            post,
          });

  } catch (error) {
   return res.json({
     message: error.message,
   });
  }
});

export {
  addPost,
  getPost,
  deletePost,
  editPost,
  singlPOst,
  getLimited,
  findMedia,
  galleryIndex,
  getBreakingNews,
  mostRecomndedNews,
};
