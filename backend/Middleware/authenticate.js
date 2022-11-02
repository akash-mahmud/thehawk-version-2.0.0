import jwt from "jsonwebtoken";
import User from "../Model/userModel.js"

const authenticate = async(req , res, next) => {

  try {
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})
  if(!rootUser){
    throw new Error('User not found');
  }
  req.token = token;
  req.rootUser = rootUser;
  req.user= rootUser;


  next()
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}

export default authenticate

export var refreshTokens = [];

export const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, isAdmin: user.isAdmin ,email: user.email }, "mySecretKey", {
    expiresIn: "5s",
  });
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin , email: user.email }, "myRefreshSecretKey");
};

export const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};