const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");

const PORT = 3300;
const filePath = path.resolve(__dirname, "users.json");

async function readUsers() {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}

async function writeUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

function resFormate({ res, statusCode = 200, message = "success", data = {} }) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message, data }));
  res.end();
}

function errFormate({ res, statusCode = 500, message = "Internal Server Error", error = {} }) {
  if (res.headersSent) return;
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.write(JSON.stringify({ message, error: error?.message || error }));
  res.end();
}

function getBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  console.log({ url, method });
   // =========================== ROUTING =========================== //
  // =========================== GET ALL USERS =========================== //
  
  if (url === "/user" && method === "GET") {
    try {
      const users = await readUsers();
      resFormate({ res, statusCode: 200, data: users });
    } catch (err) {
      errFormate({ res, error: err });
    }
  }

  // =========================== GET USER BY ID =========================== //
  else if (url.startsWith("/user/") && method === "GET") {
    try {
      const idParam = url.split("/")[2];
      if (!/^\d+$/.test(idParam)) {
        return resFormate({ res, statusCode: 400, message: "Invalid ID Format" });
      }
      const id = parseInt(idParam);
      const users = await readUsers();
      const user = users.find((u) => u.id === id);
      if (!user) {
        return resFormate({ res, statusCode: 404, message: "Not Found User, Check Your id" });
      }
      resFormate({ res, statusCode: 200, data: user });
    } catch (err) {
      errFormate({ res, error: err });
    }
  }

  // =========================== CREATE USER =========================== //
  else if (url === "/user" && method === "POST") {
    try {
      const { firstName, lastName, username, email, phone, age } = await getBody(req);
      if (!firstName || !lastName || !email) {
        return resFormate({
          res,
          statusCode: 400,
          message: "firstName, lastName and email are required",
        });
      }
      const users = await readUsers();
      if (users.some((u) => u.email === email)) {
        return resFormate({ res, statusCode: 400, message: "User Already Exists" });
      }
      const ids = users.map((u) => u.id);
      const maxId = ids.length ? Math.max(...ids) : 0;
      const id = maxId + 1;
      const newUser = { id, firstName, lastName, username, email, phone, age };
      users.push(newUser);
      await writeUsers(users);
      resFormate({ res, statusCode: 201, message: "User Created Successfully", data: newUser });
    } catch (err) {
      errFormate({ res, error: err, message: "Can Not Create new user, try again" });
    }
  }

  // =========================== DELETE USER =========================== //
  else if (url.startsWith("/user/") && method === "DELETE") {
    try {
      const idParam = url.split("/")[2];
      if (!/^\d+$/.test(idParam)) {
        return resFormate({ res, statusCode: 400, message: "Invalid ID Format" });
      }
      const id = parseInt(idParam);
      const users = await readUsers();
      const userIndex = users.findIndex((u) => u.id === id);
      if (userIndex === -1) {
        return resFormate({ res, statusCode: 404, message: "User Not Found, Check id" });
      }
      users.splice(userIndex, 1);
      await writeUsers(users);
      resFormate({ res, message: "User Deleted Successfully" });
    } catch (err) {
      errFormate({ res, error: err, message: "Error In Delete User, Try Again" });
    }
  }

  // =========================== UPDATE USER =========================== //
  else if (url.startsWith("/user/") && method === "PATCH") {
    try {
      const idParam = url.split("/")[2];
      if (!/^\d+$/.test(idParam)) {
        return resFormate({ res, statusCode: 400, message: "Invalid ID Format" });
      }
      const id = parseInt(idParam);
      const { firstName, lastName, username, email, phone, age } = await getBody(req);

      const users = await readUsers();
      const user = users.find((u) => u.id === id);
      if (!user) {
        return resFormate({ res, statusCode: 404, message: "User Not Found" });
      }
      if (email && users.some((u) => u.email === email && u.id !== id)) {
        return resFormate({ res, statusCode: 400, message: "Email Already Exists" });
      }

      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.username = username ?? user.username;
      user.email = email ?? user.email;
      user.phone = phone ?? user.phone;
      user.age = age ?? user.age;

      await writeUsers(users);
      resFormate({ res, message: "User Updated Successfully", data: user });
    } catch (err) {
      errFormate({ res, error: err, message: "Error In Update User, Try Again" });
    }
  }

  // =========================== NOT FOUND =========================== //
  else {
    resFormate({ res, statusCode: 404, message: "Route Not Found!" });
  }
});

server.listen(PORT, () => {
  console.log(`Server Is Running At http://127.0.0.1:${PORT} 💯`);
});