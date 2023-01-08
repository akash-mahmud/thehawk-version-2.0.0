import mongoose from "mongoose";
const poolSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    question: [
      {
        id: { type: String, required: true },
        text: { type: String, required: true },
        voted: { type: Number},
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Pool = mongoose.model("pool", poolSchema);
export default Pool;
