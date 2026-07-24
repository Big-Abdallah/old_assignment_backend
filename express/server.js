const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const usersFilePath = path.join(__dirname, "users.json");

// ---------- Helper functions to read/write the JSON file ----------

function readUsersFromFile() {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  // if file is empty for some reason, return empty array
  if (!data) return [];
  return JSON.parse(data);
}

function writeUsersToFile(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

function generateId(users) {
  // simple incremental id: 1 more than the current max id
  if (users.length === 0) return 1;
  const maxId = Math.max(...users.map((u) => u.id));
  return maxId + 1;
}

// ---------- Routes ----------


// 1) POST /user -> add a new user 
app.post("/user", (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ message: "name, age and email are required" });
  }

  const users = readUsersFromFile();

  const emailExists = users.find((u) => u.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = {
    id: generateId(users),
    name,
    age,
    email,
  };

  users.push(newUser);
  writeUsersToFile(users);

  res.status(201).json({ message: "User added successfully", user: newUser });
});

// 6) GET /user/filter -> filter users by minimum age 
app.get("/user/filter", (req, res) => {
  const { minAge } = req.query;

  if (!minAge) {
    return res.status(400).json({ message: "minAge query param is required" });
  }

  const users = readUsersFromFile();
  const filteredUsers = users.filter((u) => Number(u.age) >= Number(minAge));

  res.status(200).json(filteredUsers);
});

// 4) GET /user/getByName -> get a user by name (?name=)
app.get("/user/getByName", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "name query param is required" });
  }

  const users = readUsersFromFile();
  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 5) GET /user -> get all users
app.get("/user", (req, res) => {
  const users = readUsersFromFile();
  res.status(200).json(users);
});

// 3) DELETE /user  or  DELETE /user/:id -> delete user by id 
app.delete("/user/:id?", (req, res) => {
  const id = req.params.id || req.body.id;

  if (!id) {
    return res.status(400).json({ message: "User id is required (in params or body)" });
  }

  const users = readUsersFromFile();
  const userIndex = users.findIndex((u) => u.id === Number(id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  writeUsersToFile(users);

  res.status(200).json({ message: "User deleted successfully", user: deletedUser });
});

// 7) GET /user/:id -> get user by id
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const users = readUsersFromFile();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// 2) PATCH /user/:id -> update name, age or email by id
app.patch("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  const users = readUsersFromFile();
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // if the email is being changed, make sure the new email isn't used by someone else
  if (email && email !== user.email) {
    const emailTaken = users.find((u) => u.email === email && u.id !== Number(id));
    if (emailTaken) {
      return res.status(400).json({ message: "Email already exists" });
    }
    user.email = email;
  }

  if (name) user.name = name;
  if (age) user.age = age;

  writeUsersToFile(users);

  res.status(200).json({ message: "User updated successfully", user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
