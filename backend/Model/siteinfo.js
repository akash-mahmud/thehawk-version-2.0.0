import mongoose from "mongoose";
const siteInfoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    tags: { type: String },
  },
  {
    timestamps: true,
  }
);
const SiteInfo = mongoose.model("siteinfo", siteInfoSchema);
export default SiteInfo;
