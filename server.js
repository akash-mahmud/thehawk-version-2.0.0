import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import compression from "compression";
import bodyparser from "body-parser";
import morgan from "morgan";
import con from "./backend/DB/Conn.js";
import Post from "./backend/Model/postModel.js";
import fs from "fs";
import RSS from "rss";
import router from "./backend/Router/index.js";
import data from "./migrationData";
import schedule from "node-schedule";
import { backupMongoDB } from "./backend/backup/index.js";
import expressSession from 'express-session'
import passport from 'passport'
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());
app.use(morgan("dev"));
dotenv.config();
app.use(cookieParser());
app.use(compression());
app.use(fileUpload());
//Database
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(
  expressSession({
    secret: "zedblu",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
con();
// mongodb://localhost/thehawk
app.use("/", router);

app.use(
  "/thehawk/rss/feed/xml",
  express.static(path.join(__dirname, "/feed.xml"))
);

app.use(
  "/admin/backup/download",
  express.static(path.join(__dirname, "backend", "public"))
);

app.get("/thehawk/rss/feed/xml", async (req, res) => {
  const data = await Post.find();
  const blog = {
    title: "Posts Data of Thehawk ",
    description:
      "Thehawk is a news portal platform. You can get different kinds of news from here.",
    author: "Rishab Kapoor",
    articles: data,
  };
  const feed = new RSS({
    title: blog.title,
    description: blog.description,
    author: blog.author,
  });

  for (const article of blog.articles) {
    feed.item({
      title: article.postitle,
      description: article.description,
      date: article.createdAt,
    });
  }
  const xml = feed.xml({ indent: true });
  fs.writeFileSync("feed.xml", xml);

  res.sendFile(path.join(__dirname, "/feed.xml"));
});

app.use("/admin", express.static(path.join(__dirname, "admin", "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
});
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server is running");
});

// backup database every day at 3AM
schedule.scheduleJob("0 3 * * *", async () => {
  console.log("Backup  cron started");

  backupMongoDB();

  console.log("backup cron completed");
});
