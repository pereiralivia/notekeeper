import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaStickyNote } from 'react-icons/fa'

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="nav-container">
      <div className="nav-left">
        <Link to="/">
        <FaStickyNote />
          Notes
        </Link>
      </div>
      <div className="nav-right">
        {token ? (
          <div>
            <button className="logout-button" onClick={handleClick}>Logout</button>
          </div>
        ) : (
          <div className="nav-right-links">
            <Link to="/login">Login</Link>
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
