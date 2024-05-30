import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar"
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";
import './App.css';
import { TvShows } from "./pages/tvshows";
import { PopularMovies } from "./pages/movies";
import { DetailsPage } from "./pages/details";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/rated" element={<h1 className="text-3xl font-bold">My Ratings</h1>} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<PopularMovies />} />
          <Route path='/:type/:id' element={<DetailsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
