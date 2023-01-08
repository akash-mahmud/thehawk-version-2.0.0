
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const DB_NAME = 'thehawk'

const ARCHIVE_PATH = path.join(__dirname, "..", "public", `${DB_NAME}.gzip`);

const RESTORE_ARCHIVE_PATH = path.join(
  __dirname,
  "..",
  "uploads",
  `${DB_NAME}.gzip`
);


// mongodump --db=test --archive=./test.gzip --gzip

// mongorestore --db=test --archive=./test.gzip --gzip

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
    if (code) console.log("Process exit with code:", code);
    else if (signal) console.log("Process killed with signal:", signal);
    else console.log("Backup is successfull ✔✔");
  });
}

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
    if (code) {console.log("Process exit with code:", code); return code}
    else if (signal) {console.log("Process killed with signal:", signal); return signal;}
    else {
      console.log("restore is successfull ✔✔");

      fs.unlink(RESTORE_ARCHIVE_PATH, (err) => {
        if (err) return err;
        // if no error, file has been deleted successfully
        console.log("File deleted!");
        return 'sucess'
      });
    }
  });
}
module.exports = {
  backupMongoDB,
  restoreMongoDB,
};