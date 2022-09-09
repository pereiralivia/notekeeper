const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({ user: request.user._id.toString() }).sort({
    createdAt: -1,
  });

  response.status(200).json(notes);
});

notesRouter.post("/", async (request, response) => {
  const noteToCreate = {
    text: request.body.text,
    date: new Date(),
    user: request.user._id,
  };

  const newNote = await Note.create(noteToCreate);

  response.status(201).json(newNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = notesRouter;
