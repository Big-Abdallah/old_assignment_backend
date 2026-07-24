const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");
//1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
const filePath = path.resolve(__dirname, "big.txt");

const readStream = fs.createReadStream(filePath, {
  encoding: "utf-8",
  highWaterMark: 16 * 1024, // 16KB per chunk
});

let chunkCount = 0;

readStream.on("data", (chunk) => {
  chunkCount++;
  console.log(`--- Chunk #${chunkCount} (${chunk.length} chars) ---`);
  console.log(chunk);
});

readStream.on("end", () => {
  console.log(`\nFinished reading. Total chunks: ${chunkCount}`);
});

readStream.on("error", (err) => {
  console.error("Error reading file:", err.message);
});
//2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
const sourcePath = path.resolve(__dirname, "source.txt");
const destPath = path.resolve(__dirname, "dest.txt");
 
const readStream = fs.createReadStream(sourcePath);
const writeStream = fs.createWriteStream(destPath);
 
readStream.on("error", (err) => {
  console.error("Error reading source file:", err.message);
});
 
writeStream.on("error", (err) => {
  console.error("Error writing dest file:", err.message);
});
 
writeStream.on("finish", () => {
  console.log("File copied using streams");
});
 

readStream.pipe(writeStream);
//3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
const { pipeline } = require("node:stream");
 
const sourcePath = path.resolve(__dirname, "data.txt");
const destPath = path.resolve(__dirname, "data.txt.gz");
 
const readStream = fs.createReadStream(sourcePath);
const gzip = zlib.createGzip();
const writeStream = fs.createWriteStream(destPath);
 
pipeline(readStream, gzip, writeStream, (err) => {
  if (err) {
    console.error("Pipeline failed:", err.message);
    return;
  }
  console.log(`File compressed successfully -> ${destPath}`);
});
