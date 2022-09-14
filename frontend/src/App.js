import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Note from "./pages/Note";

const App = () => {
  return (
    <div>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/notes/:id" element={<Note />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
