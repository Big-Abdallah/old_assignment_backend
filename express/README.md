# Assignment 4 – Part 1: Simple CRUD Operations Using Express.js

## How to run
```
npm install
npm start
```
Server runs on `http://localhost:3000`. Data is persisted in `users.json` using the `fs` module (no in-memory arrays are used to store data).

## Endpoints

| # | Method | URL | Description |
|---|--------|-----|-------------|
| 1 | POST   | `/user` | Add a new user. Body: `{ "name", "age", "email" }`. Rejects if email already exists. |
| 2 | PATCH  | `/user/:id` | Update a user's `name`, `age`, and/or `email` by ID (from params). |
| 3 | DELETE | `/user/:id` or `/user` (id in body) | Delete a user by ID. |
| 4 | GET    | `/user/getByName?name=` | Get a user by name (query param). |
| 5 | GET    | `/user` | Get all users. |
| 6 | GET    | `/user/filter?minAge=` | Get users with age >= minAge. |
| 7 | GET    | `/user/:id` | Get a user by ID. |

## Notes
- Route order in `server.js` matters: `/user/getByName` and `/user/filter` are declared before `/user/:id` so Express doesn't treat "getByName"/"filter" as an id.
- Every request reads/writes `users.json` fresh using `fs.readFileSync` / `fs.writeFileSync`.
