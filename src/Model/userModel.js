import mongoose  from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    professionalName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isAuthor: { type: Boolean, default: true, required: true },
    avatar:{type:String},
    // author: {
    //   name: String,
    //   logo: String,
    //   description: String,
    // },
    bio:{
      type: String
    },
    socilaLinks: {
      facebook: String,
        twitter: String,
        linkedIn: String,
    },
    tokens: [
      {
        token:{
          type: String,
          //  required: true, 
        }
      }
    ]
  },
  {
    timestamps: true,
  }
  

  

);

//we are hashing password

userSchema.pre('save' , async function (next){
  if(this.isModified('password')){
  
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
});




const User = mongoose.model("User", userSchema);
export default User;
