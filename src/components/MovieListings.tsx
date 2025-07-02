
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

const MovieListings = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Use type assertion to bypass TypeScript errors until types are regenerated
        const { data, error } = await (supabase as any)
          .from('movies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching movies:', error);
          // Fallback to mock data if database query fails
          setMovies([
            {
              id: '1',
              title: 'The Matrix Reloaded',
              poster: 'photo-1526374965328-7f61d4dc18c5',
              genre: ['Action', 'Sci-Fi'],
              rating: 8.7,
              duration: '2h 18m',
              language: 'English'
            },
            {
              id: '2',
              title: 'Cyber Chronicles',
              poster: 'photo-1531297484001-80022131f5a1',
              genre: ['Thriller', 'Drama'],
              rating: 7.9,
              duration: '2h 5m',
              language: 'English'
            },
            {
              id: '3',
              title: 'Code Runner',
              poster: 'photo-1461749280684-dccba630e2f6',
              genre: ['Action', 'Tech'],
              rating: 8.2,
              duration: '1h 58m',
              language: 'English'
            },
            {
              id: '4',
              title: 'Digital Frontier',
              poster: 'photo-1526374965328-7f61d4dc18c5',
              genre: ['Action', 'Adventure'],
              rating: 8.1,
              duration: '2h 12m',
              language: 'English'
            },
            {
              id: '5',
              title: 'Tech Noir',
              poster: 'photo-1531297484001-80022131f5a1',
              genre: ['Thriller', 'Mystery'],
              rating: 7.6,
              duration: '1h 45m',
              language: 'English'
            },
            {
              id: '6',
              title: 'Binary Dreams',
              poster: 'photo-1461749280684-dccba630e2f6',
              genre: ['Sci-Fi', 'Drama'],
              rating: 8.4,
              duration: '2h 8m',
              language: 'English'
            }
          ]);
          return;
        }

        setMovies(data || []);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to mock data
        setMovies([
          {
            id: '1',
            title: 'The Matrix Reloaded',
            poster: 'photo-1526374965328-7f61d4dc18c5',
            genre: ['Action', 'Sci-Fi'],
            rating: 8.7,
            duration: '2h 18m',
            language: 'English'
          },
          {
            id: '2',
            title: 'Cyber Chronicles',
            poster: 'photo-1531297484001-80022131f5a1',
            genre: ['Thriller', 'Drama'],
            rating: 7.9,
            duration: '2h 5m',
            language: 'English'
          },
          {
            id: '3',
            title: 'Code Runner',
            poster: 'photo-1461749280684-dccba630e2f6',
            genre: ['Action', 'Tech'],
            rating: 8.2,
            duration: '1h 58m',
            language: 'English'
          },
          {
            id: '4',
            title: 'Digital Frontier',
            poster: 'photo-1526374965328-7f61d4dc18c5',
            genre: ['Action', 'Adventure'],
            rating: 8.1,
            duration: '2h 12m',
            language: 'English'
          },
          {
            id: '5',
            title: 'Tech Noir',
            poster: 'photo-1531297484001-80022131f5a1',
            genre: ['Thriller', 'Mystery'],
            rating: 7.6,
            duration: '1h 45m',
            language: 'English'
          },
          {
            id: '6',
            title: 'Binary Dreams',
            poster: 'photo-1461749280684-dccba630e2f6',
            genre: ['Sci-Fi', 'Drama'],
            rating: 8.4,
            duration: '2h 8m',
            language: 'English'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Now Showing</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
