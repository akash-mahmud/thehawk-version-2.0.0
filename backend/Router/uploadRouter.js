import express from "express";
import cloudinary from '../../Cloudinary/index.js'

const uploadRouter = express.Router();

uploadRouter.post("/" , async (req,res)=> {

  
  try {
     const fileStr = req.body.data;
     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
       upload_preset: 'thehawk',
     });
   
     res.send(uploadResponse);
  } catch (error) {

  }
})



// uploadRouter.post("/", upload.single("image"), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

export default uploadRouter;

