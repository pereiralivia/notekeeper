import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useCreateNoteMutation,
  useFetchNotesQuery,
} from "../features/apiSlice";

const Footer = () => {
  const navigate = useNavigate();

  const { data: notes = [], isLoading } = useFetchNotesQuery();
  const [createNote] = useCreateNoteMutation();

  const token = localStorage.getItem("token");

  const handleClick = async () => {
    const { data: createdNote } = await createNote({
      text: {
        title: "",
        content: "",
      },
    });
    const id = createdNote._id;
    navigate(`/notes/${id}`);
  };

  if (!token) {
    return;
  }

  if (isLoading) {
    return <p className="footer">Loading...</p>;
  }

  return (
    <div className="footer">
      <p>Notes: {notes.length}</p>
      <button onClick={handleClick}>
        <FaRegEdit className="create-note-icon"/>
      </button>
    </div>
  );
};

export default Footer;
