### 1. What is the Event Loop?

The Event Loop is what allows Node.js to handle non-blocking operations even though JavaScript runs on a single thread. It keeps checking for tasks like timers, I/O callbacks, and other events, then executes their callbacks when they are ready. This helps Node continue running other code instead of waiting.

---

### 2. What is libuv?

libuv is a C library used by Node.js. It provides the Event Loop and a thread pool for operations that can't run asynchronously by the operating system, like some file system and crypto tasks. It also makes Node work the same way on different operating systems.

---

### 3. How does Node.js handle asynchronous operations?

When an async operation starts, Node.js sends it to libuv. If the operating system supports async I/O, libuv uses that directly. Otherwise, it uses its thread pool. After the operation finishes, libuv sends the callback back to the Event Loop, which runs it when the Call Stack is free.

---

### 4. Explain the Call Stack, Event Queue, and Event Loop.

* **Call Stack:** Executes synchronous code one function at a time.
* **Event Queue:** Stores callbacks that are ready to be executed.
* **Event Loop:** Checks if the Call Stack is empty, then moves the next callback from the Event Queue to the Call Stack.

---

### 5. What is the Thread Pool in Node.js?

The Thread Pool is a group of worker threads provided by libuv. It is used for tasks like file system operations, crypto functions, DNS lookup, and some zlib operations. By default, it has 4 threads, but it can be increased using the `UV_THREADPOOL_SIZE` environment variable.

---

### 6. What is the difference between Blocking and Non-Blocking operations?

* **Blocking operations** run synchronously and stop the program until they finish, like `fs.readFileSync()`.
* **Non-blocking operations** run asynchronously, so Node.js can continue executing other code while waiting for the result, like `fs.readFile()` or HTTP requests.

For better performance, it's recommended to use asynchronous APIs whenever possible.
