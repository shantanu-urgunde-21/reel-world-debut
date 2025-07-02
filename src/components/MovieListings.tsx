
import React from 'react';
import MovieCard from './MovieCard';

const movies = [
  {
    id: 4,
    title: "Digital Frontier",
    poster: "photo-1526374965328-7f61d4dc18c5",
    genre: ["Action", "Adventure"],
    rating: 8.1,
    duration: "2h 12m",
    language: "English"
  },
  {
    id: 5,
    title: "Tech Noir",
    poster: "photo-1531297484001-80022131f5a1",
    genre: ["Thriller", "Mystery"],
    rating: 7.6,
    duration: "1h 45m",
    language: "English"
  },
  {
    id: 6,
    title: "Binary Dreams",
    poster: "photo-1461749280684-dccba630e2f6",
    genre: ["Sci-Fi", "Drama"],
    rating: 8.4,
    duration: "2h 8m",
    language: "English"
  },
  {
    id: 7,
    title: "Quantum Reality",
    poster: "photo-1526374965328-7f61d4dc18c5",
    genre: ["Sci-Fi", "Action"],
    rating: 7.8,
    duration: "2h 15m",
    language: "English"
  },
  {
    id: 8,
    title: "Virtual Escape",
    poster: "photo-1531297484001-80022131f5a1",
    genre: ["Adventure", "Thriller"],
    rating: 8.0,
    duration: "1h 52m",
    language: "English"
  },
  {
    id: 9,
    title: "Code Breaker",
    poster: "photo-1461749280684-dccba630e2f6",
    genre: ["Action", "Crime"],
    rating: 7.9,
    duration: "2h 3m",
    language: "English"
  },
  {
    id: 10,
    title: "Neural Network",
    poster: "photo-1526374965328-7f61d4dc18c5",
    genre: ["Sci-Fi", "Thriller"],
    rating: 8.3,
    duration: "1h 58m",
    language: "English"
  },
  {
    id: 11,
    title: "System Override",
    poster: "photo-1531297484001-80022131f5a1",
    genre: ["Action", "Tech"],
    rating: 7.7,
    duration: "2h 6m",
    language: "English"
  }
];

const MovieListings = () => {
  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Now Showing</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieListings;
