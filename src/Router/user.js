import express from "express";
import {
  register,
  login,
  users,
  editUser,
  me,
  logout,
  userDelete,
  adminregister,
  refresh,
  user,
} from "../Controller/UserController.js";
const passportLocal = require("../Middleware/pasportLocal");
const auth = require('../Middleware/auth')
const userRouter = express.Router();
userRouter.post("/admin/register", adminregister);
userRouter.post("/", passportLocal.authenticate("local"), login);
userRouter.post("/register", register);
userRouter.get("/me", auth, user);
userRouter.get("/me/logout", auth, logout);
userRouter.get("", users);
userRouter.patch("/:id", editUser);
userRouter.delete("/:id", userDelete);
export default userRouter;