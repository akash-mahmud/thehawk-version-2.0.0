import AWS from "aws-sdk";

const uploadImageOnBucket = async (image) => {
  const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: image.originalname,
    Body: file,
    ContentType: image.mimetype,
    ACL: "public-read",
  };
  s3bucket.upload(params, async (err, data) => {
    try {
      if (err) {
        return {
          error: true,
          message: err,
        };
      } else {
        return {
          s3_key: params.Key,
          url: s3FileURL + image.originalname,
          error: false,
          message: "Uploaded",
        };
      }
    } catch (err) {
      return {
        error: true,
        message: err.message,
      };
    }
  });
};

export default uploadImageOnBucket;
