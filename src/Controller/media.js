import expressAsyncHandler from "express-async-handler";
import convertWebp from "../utils/sharp";
import fs from 'fs'
import uploadImageOnBucket from "../utils/s3bucket";
const uploadSingleImage = expressAsyncHandler(async (req, res) => {
  try {
    //Image processing
    const image = req.file;

      const splitedImage = req.file.originalname.split('.' , -1)
      const imageExtension = splitedImage[splitedImage.length -1];
      const imageName = req.file.originalname.replace('.' + imageExtension, '');
      
      const newBuffer = await convertWebp(image.buffer);
      image.buffer = newBuffer;
//For testing
    
    // fs.writeFile("pic.webp", newBuffer, (err) => {
    //   if (err) throw err;
    //   console.log("The file has been saved!");
    // });

// Image uploading on s3 bucket
    
    const bucketResponsce = await uploadImageOnBucket(image);

  } catch (error) {
      console.log(error);
    res.send(error.message);
  }
});

const uploadMultipleImgae = expressAsyncHandler(async (req, res) => {
  try {

    res.send("success");
  } catch (error) {
    res.send(error.message);
  }
});

export { uploadSingleImage, uploadMultipleImgae };
