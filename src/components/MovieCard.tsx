
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface Movie {
  id: number;
  title: string;
  poster: string;
  genre: string[];
  rating: number;
  duration: string;
  language: string;
}

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard = ({ movie, featured = false }: MovieCardProps) => {
  if (featured) {
    return (
      <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden group cursor-pointer">
        <img
          src={`https://images.unsplash.com/${movie.poster}?auto=format&fit=crop&w=800&q=80`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((g) => (
              <Badge key={g} variant="secondary" className="bg-red-600 hover:bg-red-700 text-white border-0">
                {g}
              </Badge>
            ))}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2">{movie.title}</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              ⭐ {movie.rating}/10
            </span>
            <span>{movie.duration}</span>
            <span>{movie.language}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-lg overflow-hidden mb-3 aspect-[3/4]">
        <img
          src={`https://images.unsplash.com/${movie.poster}?auto=format&fit=crop&w=400&q=80`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2">{movie.title}</h3>
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="outline" className="text-xs border-gray-600 text-gray-300">
              {g}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>⭐ {movie.rating}</span>
          <span>{movie.language}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
