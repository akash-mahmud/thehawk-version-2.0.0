import User from "../Model/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler  from "express-async-handler";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, refreshTokens } from "../Middleware/authenticate.js";


  const adminregister = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Please fill the data properly.");
    }
  
    try {
      const userExist = await User.findOne({ email: email });
  
      if (userExist) {
        return res.status(400).send("Email already exists");
      }
  
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        bio: req.body.bio,
        socilaLinks: {
          facebook: req.body.facebook,
          twitter: req.body.twitter,
          linkedIn: req.body.linkedIn,
        },
        professionalName: req.body.professionalName,
        avatar: req.body.avatar,
      });
  
      // password hashing
  
      await user.save();
      res.send("User registered succussfully");
    } catch (error) {
    }
  });

    const register = expressAsyncHandler(async (req, res) => {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).send('Please fill the data properly.');
      }

      try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
          return res.status(400).send('Email already exists');
        }

        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          bio: req.body.bio,
          socilaLinks: {
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            linkedIn: req.body.linkedIn,
          },
          professionalName: req.body.professionalName,
          avatar: req.body.avatar,
          isAdmin:false
        });

        // password hashing

        await user.save();
        res.send('User registered succussfully');
      } catch (error) {}
    }
    
    );
  const login = expressAsyncHandler(async (req, res) => {
    console.log(req.body.email);
    console.log(req.user.email); 
try {
  return res.send('success')
} catch (error) {
  res.send(error.message)
}
  });

const user = (request, resposnce, next) => {

    try {
      return resposnce.json(
       request.user
      );
    } catch (error) {
      return next(error);
    }
};
// logout

const logout = (request, resposnce, next) => {
  try {

    request.logout((err) => {
      if (err) return resposnce.json({ message: err.message })
      return resposnce.json({
        logout: true
      })
    })


  } catch (error) {
    return resposnce.json({
      message: error.message
    })
  }

};
const refresh = expressAsyncHandler(async (req, res) => {
      //take the refresh token from the user
  const refreshToken = req.body.token;

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }
  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });

  //if everything is ok, create new access token, refresh token and send to user
})

  const me = expressAsyncHandler(async (req, res) => {
    res.send(req.rootUser);
  });
  
  const users = expressAsyncHandler(async (req, res) => {
    const data = await User.find();
    if (data) {
      res.send(data);
    } else {
      res.status(403).send("No user");
    }
  });
  

  
  const userDelete = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      const deleteUser = await user.remove();
      res.send({ message: "User Deleted", user: deleteUser });
    } else {
      res.status(404).send({ message: "user Not Found" });
    }
  });

  const editUser = async (req, res) => {
    const filter = await User.findOne({ _id: req.params.id });
        const { name, email, password } = req.body;
              if (!name || !email || !password) {
                return res.status(400).send('Please fill the data properly.');
              }
    const updatedUser = {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      bio: req.body.bio,
      socilaLinks: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedIn: req.body.linkedIn,
      },
      professionalName: req.body.professionalName,
      avatar: req.body.avatar,
    };
    let doc = await User.updateOne(filter, updatedUser);
    if (doc) {
      res.send(doc);
    }




    
  };


export {
  register,
  login,
  me,
  logout,
  userDelete,
  users,
  editUser,
  adminregister,
  refresh,
  user
};
