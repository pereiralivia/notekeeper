import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";

const Dashboard = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
      navigate('/login')
    }  
  })

  if(!token){
    return
  }

  return (
    <div className="notes-container">
      <div>
        <h3>Dashboard</h3>
      </div>
      <NoteForm />
      <NotesList />
    </div>
  );
};

export default Dashboard;
