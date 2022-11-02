import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    postitle: { type: String, required: true },
    postText: { type: String },
    subHeading: { type: String },
    description: { type: String },
    pageDescripion: { type: String },
    img: String,
    imgAlt: String,
    author: {
      name: String,
      professionalName: String,
      id: { type: String },
    },
    category: {
      name: String,
      id: { type: String, required: true },
    },
    subCategory: {
      name: String,
      id: { type: String },
    },

    isFetaured: { type: Boolean, default: false },
    isBreaking: { type: Boolean, default: false },
    isFetauredTop: { type: Boolean, default: false },
    isRight: { type: Boolean, default: true },
    isTrending: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    isTopRight: { type: Boolean, default: false },
    tags: { type: String },
    keyWords: { type: String },
    pageTitle: { type: String },
    pageDescription: { type: String },
    socialShare: { type: Boolean },
    video: { type: String },
  },
  {
    timestamps: true,
  }
);
const Post = mongoose.model("post", postSchema);
export default  Post;
