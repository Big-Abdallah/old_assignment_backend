# Assignment 3 - Node.js HTTP & Core Modules

This project is my solution for **Assignment 3** using **Node.js** without Express.

## 📂 Project Structure

```
.
├── big.txt
├── bonus.js
├── data.txt
├── data.txt.gz
├── dest.txt
├── part_1.js
├── part_2.js
├── part_3.md
├── source.txt
├── users.json
└── README.md
```

---

# 📌 Part 1 - Core Modules

### 1. Read a File Using Streams

Reads a large file in chunks using a readable stream and logs every chunk.

```bash
node part_1.js
```

---

### 2. Copy a File Using Streams

Copies the content of `source.txt` into `dest.txt` using readable and writable streams.

---

### 3. Compress a File

Uses `stream.pipeline()` with `zlib` to compress `data.txt` into `data.txt.gz`.

---

# 📌 Part 2 - Simple CRUD HTTP API

The project uses:

- Node.js HTTP module
- File System (`fs/promises`)
- JSON file as the database

Server runs on:

```
http://localhost:3300
```

## API Endpoints

### Get All Users

```
GET /user
```

---

### Get User By ID

```
GET /user/:id
```

Example:

```
GET /user/1
```

---

### Add User

```
POST /user
```

Example Body:

```json
{
  "firstName": "Abdallah",
  "lastName": "Mohamed",
  "username": "BigAbdallah",
  "email": "abdallah@example.com",
  "phone": "01000000000",
  "age": 20
}
```

---

### Update User

```
PATCH /user/:id
```

Example:

```
PATCH /user/1
```

Body:

```json
{
  "age": 21
}
```

---

### Delete User

```
DELETE /user/:id
```

Example:

```
DELETE /user/1
```

---

# 📌 Part 3 - Node Internals

Answers are included in:

```
part_3.md
```

Topics covered:

- Event Loop
- Libuv
- Asynchronous Operations
- Call Stack
- Event Queue
- Thread Pool
- Blocking vs Non-Blocking

---

# 🎁 Bonus

Solved **Majority Element** from LeetCode.

Solution is available in:

```
bonus.js
```

---

# 🛠️ Technologies

- Node.js
- HTTP Module
- File System (fs)
- Streams
- Pipeline
- Zlib
- JavaScript

---

# 🚀 Run the Project

Start the HTTP server:

```bash
node part_2.js
```

Run Core Modules examples:

```bash
node part_1.js
```

---

# 👨‍💻 Author

**Abdallah Mohamed**

Backend Developer | Node.js