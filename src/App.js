import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './MovieCard/MovieCard';
import Header from './Header/Header';
import Pagination from './Pagination/Pagination';

const API_KEY = '1e448e0dfcdbb565f5d329820065b4d2';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const movieRef = useRef();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages>500 ? 500 : response.data.total_pages );
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleSearch = async (keyword, language, year) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${keyword+' '+year+ ' ' + language}`
      );
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages>500 ? 500 : response.data.total_pages );
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const markAsWatched = (movieId) => {
    if (!watchedMovies.includes(movieId)) {
      setWatchedMovies([...watchedMovies, movieId]);
    }
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
      );
      setMovies(response.data.results);
      movieRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };


  return (
    <div className="App">
      <Header handleSearch={handleSearch}/>
      <div className="movie-cards-container" ref={movieRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} watchedMovies={watchedMovies} markAsWatched={markAsWatched} />
          ))}
        </div>
        {totalPages>2 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
     </div>
     
  );
}

export default App;
