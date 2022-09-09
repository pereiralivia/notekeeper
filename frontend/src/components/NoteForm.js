import { useState } from "react";
import { useCreateNoteMutation } from "../features/apiSlice";

const NoteForm = () => {
  const [noteText, setNoteText] = useState("");
  const [createNote] = useCreateNoteMutation();

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createNote({
      text: noteText,
    });

    setNoteText("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-item note">
        <input
          className="note-input"
          name="noteText"
          value={noteText}
          onChange={handleChange}
          placeholder="I need to buy..."
          onKeyDown={(e) => (e.code === "Enter" ? handleSubmit : "")}
        />
      </div>
    </form>
  );
};

export default NoteForm;
