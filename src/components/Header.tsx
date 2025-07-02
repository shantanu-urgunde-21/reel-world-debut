
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Film, Menu, Search, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const handleAuthClick = () => {
    if (user) {
      handleSignOut();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <Film className="h-8 w-8 text-red-500" />
            <span className="text-xl md:text-2xl font-bold text-white">BookMyShow</span>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for movies, events, plays, sports..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Location and Profile */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">Mumbai</span>
            </div>
            
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-white">
                <span className="text-sm">Welcome, {user.email}</span>
              </div>
            )}

            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-gray-800"
              onClick={handleAuthClick}
            >
              {user ? <LogOut className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search movies..."
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
