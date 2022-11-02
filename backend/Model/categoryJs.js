import mongoose  from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    categoryPageTitle: { type: String },
    categoryPageKeyWords: { type: String },
    categoryText: { type: String },
    categoryImg: { type: String },
    addTop: { type: Boolean, default: false },
    addToMenu: { type: Boolean, default: false },
    isGridSection: { type: Boolean, default: false },
    addToComminSection: { type: Boolean  },
    isPlainSection:{type: Boolean, default: false},
    gridWithWizard:{type: Boolean, default: false},
    coloumnWithWizard:{type: Boolean, default: false},
    isblueSection: { type: Boolean, default: false },
    isVideoSection: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("category", categorySchema);
export default Category;
