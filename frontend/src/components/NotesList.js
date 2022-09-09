import { useFetchNotesQuery } from "../features/apiSlice";
import { useDeleteNoteMutation } from "../features/apiSlice";
import { FaTrashAlt } from "react-icons/fa";

const NotesList = () => {
  const { data: notes = [], isLoading } = useFetchNotesQuery();
  const [deleteNote] = useDeleteNoteMutation();

  const handleClick = (noteId) => {
    deleteNote(noteId);
  };

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return (
    <ul className="notes-list">
      {notes.map((note) => (
        <li className="notes-list-item" key={note._id}>
          <div>
            <p>{note.text}</p>
            <p className="note-list-item-date">
              {new Date(note.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <button onClick={() => handleClick(note._id)}>
            <FaTrashAlt />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
