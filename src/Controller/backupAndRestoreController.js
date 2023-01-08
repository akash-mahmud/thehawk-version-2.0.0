import expressAsyncHandler from "express-async-handler";

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const DB_NAME = "thehawk";

const ARCHIVE_PATH = path.join(__dirname, "..", "public", `${DB_NAME}.gzip`);

const RESTORE_ARCHIVE_PATH = path.join(
  __dirname,
  "..",
  "uploads",
  `${DB_NAME}.gzip`
);

const backUpDownload = expressAsyncHandler(async (req, res) => {
  if (fs.existsSync(ARCHIVE_PATH)) {
    res.status(200).json({ path: `/admin/backup/download/${DB_NAME}.gzip` });
  } else {
    function backupMongoDB() {
      const child = spawn("mongodump", [
        `--db=${DB_NAME}`,
        `--archive=${ARCHIVE_PATH}`,
        "--gzip",
      ]);

      child.stdout.on("data", (data) => {
        console.log("stdout:\n", data);
      });

      child.stderr.on("data", (data) => {
        console.log("stdout:\n", Buffer.from(data).toString());
      });
      child.on("error", (error) => {
        console.log("error:\n", error);
      });

      child.on("exit", (code, signal) => {
        if (code) {
          console.log("Process exit with code:", code);
        } else if (signal) {
          console.log("Process killed with signal:", signal);
        } else {
          console.log("Backup is successfull ✔✔");
          res
            .status(200)
            .json({ path: `/admin/backup/download/${DB_NAME}.gzip` });
        }
      });
    }
    backupMongoDB();
  }
});
const restoreBackUp = expressAsyncHandler(async (req, res) => {

  let databaseFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(401).send("No files were uploaded.");
  }
  databaseFile = req.files.database;
  uploadPath = RESTORE_ARCHIVE_PATH;
  databaseFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    console.log("File uploaded!");
    const restorePath = RESTORE_ARCHIVE_PATH;

    if (fs.existsSync(restorePath)) {
      console.log("exists:", restorePath);

      function restoreMongoDB() {
        const child = spawn("mongorestore", [
          `--db=${DB_NAME}`,
          `--archive=${RESTORE_ARCHIVE_PATH}`,
          "--gzip",
        ]);

        child.stdout.on("data", (data) => {
          console.log("stdout:\n", data);
        });

        child.stderr.on("data", (data) => {
          console.log("stdout:\n", Buffer.from(data).toString());
        });
        child.on("error", (error) => {
          console.log("error:\n", error);
        });

        child.on("exit", (code, signal) => {
          if (code) {
            console.log("Process exit with code:", code);
            return code;
          } else if (signal) {
            console.log("Process killed with signal:", signal);
            return signal;
          } else {
            console.log("restore is successfull ✔✔");

            fs.unlink(RESTORE_ARCHIVE_PATH, (err) => {
              if (err) return err;
              // if no error, file has been deleted successfully
              console.log("File deleted!");
              return res.status(200).json({
                message: "Database restored successfully",
              });
            });
          }
        });
      }
      restoreMongoDB();
    } else {
      console.log("DOES NOT exist:", restorePath);
      res.status(404).json({ messafe: "no file found" });
    }
  });
});
export { backUpDownload, restoreBackUp };
