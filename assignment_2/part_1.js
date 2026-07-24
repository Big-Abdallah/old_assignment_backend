const fs = require("node:fs");
const fsp = require("node:fs/promises");
const path = require("node:path");
const EventEmitter = require("node:events");
const os = require("node:os");
// 1. Log current file path and directory

function currentPath() {
  console.log({
    File: __filename,
    Dir: __dirname,
  });
}

currentPath();

// 2. Return file name

function getFileName(filePath) {
  return path.basename(filePath);
}

console.log(getFileName("/user/files/report.pdf"));

// 3. Build path from object

function buildPath({ dir, name, ext }) {
  return path.format({
    dir,
    name,
    ext,
  });
}

console.log(
  buildPath({
    dir: "/folder",
    name: "app",
    ext: ".js",
  }),
);

// 4. Return file extension

function getExtension(filePath) {
  return path.extname(filePath);
}

console.log(getExtension("/docs/readme.md"));

// 5. Parse path

function parsePath(filePath) {
  const parsed = path.parse(filePath);

  return {
    Name: parsed.name,
    Ext: parsed.ext,
  };
}

console.log(parsePath("/home/app/main.js"));

// 6. Check absolute path

function isAbsolute(filePath) {
  return path.isAbsolute(filePath);
}

console.log(isAbsolute("/home/user/file.txt"));

// 7. Join multiple segments

function joinSegments(...segments) {
  return path.join(...segments);
}

console.log(joinSegments("src", "components", "App.js"));

// 8. Resolve relative path

function resolvePath(relativePath) {
  return path.resolve(relativePath);
}

console.log(resolvePath("./index.js"));

// 9. Join two paths

function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}

console.log(joinTwoPaths("/folder1", "folder2/file.txt"));

// 10. Delete a file asynchronously

async function deleteFile(filePath) {
  try {
    await fsp.unlink(filePath);
    console.log(`${path.basename(filePath)} is deleted.`);
  } catch (err) {
    console.log(err.message);
  }
}

// Example
// deleteFile("./delete-me.txt");

// 11. Create a folder synchronously

function createFolder(folderName) {
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }

    console.log("Success");
  } catch (err) {
    console.log(err.message);
  }
}

createFolder("./test-folder");

// 12. Event Emitter (start)

const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered!");
});

emitter.emit("start");

// 13. Login Event

emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});

emitter.emit("login", "Ahmed");

// 14. Read file synchronously

function readSync(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    console.log("The file content =>");
    console.log(content);
  } catch (err) {
    console.log(err.message);
  }
}

readSync("./notes.txt");

// 15. Write file asynchronously

async function writeAsync(filePath, content) {
  try {
    await fsp.writeFile(filePath, content);

    console.log("File written successfully.");
  } catch (err) {
    console.log(err.message);
  }
}

writeAsync("./async.txt", "Async save");

// 16. Check if directory exists

function directoryExists(folder) {
  return fs.existsSync(folder);
}

console.log(directoryExists("./test-folder"));

// 17. Platform & Architecture

function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch(),
  };
}

console.log(getSystemInfo());
