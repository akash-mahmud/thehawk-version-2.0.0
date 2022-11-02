import mongoose from "mongoose";
const subscribeSchema = new mongoose.Schema(
  {
    email: { type: String , required:true},

  },
  {
    timestamps: true,
  }
);
const Subscriber = mongoose.model("subscriber", subscribeSchema);
export default Subscriber;
