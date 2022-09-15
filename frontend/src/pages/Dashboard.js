import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesList from "../components/NotesList";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  if (!token) {
    return;
  }

  return (
    <div className="dashboard-container">
      <div className="notes-container">
        <div>
          <h2>Notes</h2>
          <input
            name="keyword"
            value={keyword}
            placeholder="Buscar"
            onChange={handleChange}
          ></input>
        </div>
        <NotesList keyword={keyword} />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
