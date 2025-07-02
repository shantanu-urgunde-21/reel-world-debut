
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedMovies from '../components/FeaturedMovies';
import MovieListings from '../components/MovieListings';

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <FeaturedMovies />
        <MovieListings />
      </main>
    </div>
  );
};

export default Index;
