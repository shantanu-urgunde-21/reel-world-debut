
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Globe, Star, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Movie {
  id: string;
  title: string;
  poster: string;
  genre: string[];
  rating: number;
  duration: string;
  language: string;
  description?: string;
  release_date?: string;
  director?: string;
  cast?: string[];
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        // Use type assertion to bypass TypeScript errors until types are regenerated
        const { data, error } = await (supabase as any)
          .from('movies')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching movie:', error);
          // Fallback to mock data for demo purposes
          const mockMovie = {
            id: id,
            title: 'The Matrix Reloaded',
            poster: 'photo-1526374965328-7f61d4dc18c5',
            genre: ['Action', 'Sci-Fi'],
            rating: 8.7,
            duration: '2h 18m',
            language: 'English',
            description: 'Neo and his allies race against time as the machines discover the location of Zion and march toward total destruction.',
            release_date: '2003-05-15',
            director: 'Lana Wachowski, Lilly Wachowski',
            cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
          };
          setMovie(mockMovie);
          return;
        }

        if (!data) {
          toast.error('Movie not found');
          navigate('/');
          return;
        }

        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
        // Fallback to mock data
        const mockMovie = {
          id: id || '1',
          title: 'The Matrix Reloaded',
          poster: 'photo-1526374965328-7f61d4dc18c5',
          genre: ['Action', 'Sci-Fi'],
          rating: 8.7,
          duration: '2h 18m',
          language: 'English',
          description: 'Neo and his allies race against time as the machines discover the location of Zion and march toward total destruction.',
          release_date: '2003-05-15',
          director: 'Lana Wachowski, Lilly Wachowski',
          cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']
        };
        setMovie(mockMovie);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  const handleBookTickets = () => {
    if (!user) {
      toast.error('Please sign in to book tickets');
      navigate('/auth');
      return;
    }
    
    toast.success('Booking feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={`https://images.unsplash.com/${movie.poster}?auto=format&fit=crop&w=600&q=80`}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Movie Information */}
          <div className="lg:col-span-2 text-white space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map((g) => (
                  <Badge key={g} variant="secondary" className="bg-red-600 hover:bg-red-700 text-white border-0">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Rating and Details */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">{movie.rating}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span>{movie.language}</span>
                </div>
                {movie.release_date && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {movie.description && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold mb-3">About the Movie</h2>
                  <p className="text-gray-300 text-lg leading-relaxed">{movie.description}</p>
                </div>
              )}

              {/* Director */}
              {movie.director && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Director</h3>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
              )}

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Book Tickets Button */}
              <div className="pt-6">
                <Button
                  size="lg"
                  onClick={handleBookTickets}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
                >
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
