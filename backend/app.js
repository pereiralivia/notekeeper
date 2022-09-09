require("express-async-errors");
const path = require("path");
const cors = require("cors");
const express = require("express");
const connectToDatabase = require("./database");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

connectToDatabase();

const app = express();

const usersRouter = require("./controllers/users");
const notesRouter = require("./controllers/notes");
const res = require("express/lib/response");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (request, response) =>
    response.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
}

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/notes", auth, notesRouter);
app.use(errorHandler);

module.exports = app;
