import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar"
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 className="text-3xl font-bold">Home</h1>} />
          <Route path="/rated" element={<h1 className="text-3xl font-bold">My Ratings</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
