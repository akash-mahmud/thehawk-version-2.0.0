import mongoose  from "mongoose";
const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true },
    category: { type: String, required: true },
    categoryId: { type: String, required: true },
    subCategoryPageTitle: { type: String },
    subCategoryPageKeyWords: { type: String },
    subCategoryText: { type: String },
  },
  {
    timestamps: true,
  }
);
const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
