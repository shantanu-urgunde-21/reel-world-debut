
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string[];
  rating: number;
  duration: string;
  language: string;
}

const FeaturedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const { data, error } = await supabase
          .from('movies')
          .select('*')
          .order('rating', { ascending: false })
          .limit(3);

        if (error) {
          console.error('Error fetching featured movies:', error);
          return;
        }

        setMovies(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMovies();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 md:h-[500px] bg-gray-800 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Featured Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} featured />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
