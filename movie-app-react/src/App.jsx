import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar"
import { Home } from "./pages/home";
import './App.css';
import { TvShows } from "./pages/tvshows";
import { PopularMovies } from "./pages/movies";
import { DetailsPage } from "./pages/details";
import { Rated } from "./pages/rated";
import { SearchResult } from "./pages/search";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rated" element={<Rated />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<PopularMovies />} />
          <Route path='/:type/:id' element={<DetailsPage />}></Route>
          <Route path='/search' element={<SearchResult />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
