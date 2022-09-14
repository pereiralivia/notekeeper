import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchNoteQuery,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../features/apiSlice";
import { FaArrowLeft } from "react-icons/fa";

const Note = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const { data: note = {}, isLoading, isSuccess } = useFetchNoteQuery(id);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [noteText, setNoteText] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setNoteText(note.text);
    }
  }, [setNoteText, note, isSuccess]);

  const handleChange = (e) => {
    setNoteText({
      ...noteText,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    if (!noteText.title && !noteText.content) {
      await deleteNote(id);

      navigate("");
    }

    await updateNote({
      id,
      updatedText: {
        text: {
          title: noteText.title || "Untitled",
          content: noteText.content,
        },
      },
    });

    navigate("/");
  };

  if (isLoading) {
    return <p className="loading">...loading</p>;
  }

  return (
    <div className="note-main-container">
      <div className="note-container">
        <button onClick={handleClick}>
          <FaArrowLeft /> Back
        </button>
        <textarea
          className="note-title"
          name="title"
          value={noteText.title}
          placeholder="Untitled"
          onChange={handleChange}
        ></textarea>
        <textarea
          className="note-content"
          name="content"
          autoFocus
          value={noteText.content}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
};

export default Note;
