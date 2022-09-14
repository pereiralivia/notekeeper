import { useNavigate } from "react-router-dom";
import { useFetchNotesQuery, useDeleteNoteMutation } from "../features/apiSlice";
import { FaTrash } from 'react-icons/fa'

const NotesList = ({ keyword }) => {
  const { data: notes = [], isLoading, isError, error } = useFetchNotesQuery();
  const [deleteNote] = useDeleteNoteMutation()
  const navigate = useNavigate();

  const handleOpenNote = (noteId) => {
    navigate(`/notes/${noteId}`);
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId)
  }

  if (isError) {
    console.log(error);
    return <p>An error occured, please refresh the page.</p>;
  }

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <ul className="notes-list">
      {notes
        .filter(
          (note) =>
            note.text.content.toLowerCase().includes(keyword.toLowerCase()) ||
            note.text.title.toLowerCase().includes(keyword.toLowerCase())
        )
        .map((note) => (
          <li key={note._id}>
            <div className="list-item-group">
              <div
                className="notes-list-item"
                onClick={() => handleOpenNote(note._id)}
              >
                <p className="note-title">{note?.text?.title}</p>
                <p className="note-text">
                  <span className="note-date">
                    {new Date(note.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                  {note?.text?.content}
                </p>
              </div>
              <button onClick={() => handleDeleteNote(note._id)}><FaTrash /></button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default NotesList;
