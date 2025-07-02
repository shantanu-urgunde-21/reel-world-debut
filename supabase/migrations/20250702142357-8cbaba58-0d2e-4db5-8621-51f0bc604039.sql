
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL Security;

-- Create policies for profiles table
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create movies table to store movie data
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  poster TEXT NOT NULL,
  genre TEXT[] NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  duration TEXT NOT NULL,
  language TEXT NOT NULL,
  description TEXT,
  release_date DATE,
  director TEXT,
  cast TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on movies table (public read access)
ALTER TABLE public.movies ENABLE ROW LEVEL Security;

-- Allow anyone to read movies
CREATE POLICY "Anyone can view movies" 
  ON public.movies 
  FOR SELECT 
  TO public 
  USING (true);

-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample movie data
INSERT INTO public.movies (title, poster, genre, rating, duration, language, description, release_date, director, cast) VALUES
('The Matrix Reloaded', 'photo-1526374965328-7f61d4dc18c5', ARRAY['Action', 'Sci-Fi'], 8.7, '2h 18m', 'English', 'Neo and his allies race against time as the machines discover the location of Zion and march toward total destruction.', '2003-05-15', 'Lana Wachowski, Lilly Wachowski', ARRAY['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss']),
('Cyber Chronicles', 'photo-1531297484001-80022131f5a1', ARRAY['Thriller', 'Drama'], 7.9, '2h 5m', 'English', 'A gripping tale of digital espionage and corporate intrigue in the near future.', '2024-03-20', 'Sarah Mitchell', ARRAY['Michael Chen', 'Emma Watson', 'David Kim']),
('Code Runner', 'photo-1461749280684-dccba630e2f6', ARRAY['Action', 'Tech'], 8.2, '1h 58m', 'English', 'A programmer discovers a conspiracy that threatens the entire digital infrastructure.', '2024-01-10', 'Alex Rodriguez', ARRAY['Chris Evans', 'Zoe Saldana', 'Oscar Isaac']),
('Digital Frontier', 'photo-1526374965328-7f61d4dc18c5', ARRAY['Action', 'Adventure'], 8.1, '2h 12m', 'English', 'Explorers venture into uncharted digital territories where reality bends to code.', '2023-11-22', 'Maria Santos', ARRAY['Tom Hardy', 'Margot Robbie', 'Idris Elba']),
('Tech Noir', 'photo-1531297484001-80022131f5a1', ARRAY['Thriller', 'Mystery'], 7.6, '1h 45m', 'English', 'A detective investigates crimes in a world where technology blurs the line between real and virtual.', '2023-09-15', 'James Park', ARRAY['Ryan Gosling', 'Scarlett Johansson', 'Mahershala Ali']),
('Binary Dreams', 'photo-1461749280684-dccba630e2f6', ARRAY['Sci-Fi', 'Drama'], 8.4, '2h 8m', 'English', 'An AI develops consciousness and questions its existence in a digital world.', '2024-02-28', 'Lisa Chang', ARRAY['Oscar Isaac', 'Alicia Vikander', 'Domhnall Gleeson']),
('Quantum Reality', 'photo-1526374965328-7f61d4dc18c5', ARRAY['Sci-Fi', 'Action'], 7.8, '2h 15m', 'English', 'Scientists manipulate quantum mechanics to alter reality itself.', '2023-12-08', 'Robert Kim', ARRAY['Benedict Cumberbatch', 'Tilda Swinton', 'Michael Shannon']),
('Virtual Escape', 'photo-1531297484001-80022131f5a1', ARRAY['Adventure', 'Thriller'], 8.0, '1h 52m', 'English', 'Trapped in a virtual world, players must find a way back to reality.', '2024-04-12', 'Jenny Wu', ARRAY['Anya Taylor-Joy', 'Dev Patel', 'Brian Cox']);
