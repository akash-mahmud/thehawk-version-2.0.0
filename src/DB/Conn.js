import mongoose  from "mongoose";

const con = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    
 console.log('database conected');
  } catch (error) {

  }
};

export default con