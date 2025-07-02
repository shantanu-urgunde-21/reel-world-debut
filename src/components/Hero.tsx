
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Info } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Book Tickets for the
            <span className="text-red-500"> Latest Movies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Discover and book tickets for the hottest movies, events, and shows in your city. 
            Experience entertainment like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
              <Play className="mr-2 h-5 w-5" />
              Book Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <Info className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
