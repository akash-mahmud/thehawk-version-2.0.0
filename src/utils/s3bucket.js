import AWS from "aws-sdk";

const uploadImageOnBucket = async (image , res) => {
try {

        let s3bucket = new AWS.S3({
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: process.env.AWS_REGION,
        });
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: image.originalname,
          Body: image.buffer,
          ContentType: image.mimetype,
          ACL: "public-read",
        };
        s3bucket.upload(params, async (err, data) => {
          try {
            if (err) {
              return res.json( {
                error: true,
                message: err,
              });
            } else {
              return res.json({
                s3_key: params.Key,
                url: data.Location,

                message: "Uploaded",
              });
            }
          } catch (err) {
            return res.json( {
              error: true,
              message: err.message,
            });
          }
        });
} catch (error) {

         return res.json( {
              error: true,
              message: err,
            });
  
}

 

};

export default uploadImageOnBucket;
