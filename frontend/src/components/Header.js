import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useCreateNoteMutation } from "../features/apiSlice";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [createNote] = useCreateNoteMutation();

  const token = localStorage.getItem("token");

  const isNotePage = location.pathname.includes("/notes");
  const isRegisterPage = location.pathname.includes("/register");

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleClickCreateNote = async () => {
    const { data: createdNote } = await createNote({
      text: {
        title: "",
        content: "",
      },
    });
    const id = createdNote._id;
    navigate(`/notes/${id}`);
  };

  if (isNotePage) {
    return;
  }

  return (
    <header className="nav-container">
      <div className="nav-left">
        <Link to="/">
          <FaPencilAlt /> NoteKeeper
        </Link>
      </div>
      <div className="nav-right">
        {token ? (
          <div className="dashboard-links">
            <button
              className="create-note-button"
              onClick={handleClickCreateNote}
            >
              New note
            </button>
            <button className="logout-button" onClick={handleClick}>
              <span className="logout-button-name">Logout</span>
            </button>
          </div>
        ) : (
          <div className="nav-right-links">
            <Link to="/login" className={isRegisterPage ? "inactive-link" : ""}>Login</Link>
            <Link className="sign-up-button" to="/register">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
