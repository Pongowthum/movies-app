import React from 'react';
import './MovieCard.css'; 

const MovieCard = ({ movie, markAsWatched, watchedMovies }) => {
  const { title, poster_path, vote_average, overview } = movie;

  const handleReadMore = () => {
    window.open(`https://www.imdb.com/find/?q=${movie.id}`, '_blank',);
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
        className="movie-thumbnail"
      />
      <h2 className="movie-title">{title}</h2>
      <p className="movie-rating">Rating: {vote_average}</p>
      <p className="movie-description">{overview}</p>
      <button className="read-more-button"  onClick={() => markAsWatched(movie.id)}>
              {watchedMovies.includes(movie.id) ? 'Already watched' : 'Mark as Watched'}
            </button>
      <button className="read-more-button" onClick={handleReadMore}>
        Read More
      </button>
    </div>
  );
};

export default MovieCard;
