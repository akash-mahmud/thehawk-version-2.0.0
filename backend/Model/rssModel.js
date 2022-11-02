import mongoose  from "mongoose";
const rssSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // perPage: { type: Number},
    rssUrl: { type: String, required: true },
    category: {
      name: String,
      id: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
const Rss = mongoose.model("rss", rssSchema);
export default Rss;
