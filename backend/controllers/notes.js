const jwt = require("jsonwebtoken");
const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({ user: request.user._id.toString() }).sort({
    createdAt: -1,
  });

  response.status(200).json(notes);
});

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id)

  response.status(200).json(note);
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

notesRouter.patch("/:id", async (request, response) => {
  const noteToUpdate = {
    text: request.body.text,
  }
  const updatedNote = await Note.findByIdAndUpdate(request.params.id, noteToUpdate, {new: true});

  response.status(201).json(updatedNote);
});

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = notesRouter;
