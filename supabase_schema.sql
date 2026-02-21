-- Supabase Database Schema

-- 1. Create shelters table
CREATE TABLE IF NOT EXISTS public.shelters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    distance TEXT NOT NULL,
    logo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create pets table
CREATE TABLE IF NOT EXISTS public.pets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    age TEXT NOT NULL,
    gender TEXT NOT NULL,
    location TEXT NOT NULL,
    distance TEXT NOT NULL,
    fee TEXT,
    image TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('dog', 'cat', 'bird', 'rabbit', 'other')),
    tags TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    shelter_id UUID REFERENCES public.shelters(id),
    video_url TEXT,
    vaccination TEXT,
    neutered BOOLEAN DEFAULT false,
    special_needs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create adoption_applications table
CREATE TABLE IF NOT EXISTS public.adoption_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    pet_id UUID REFERENCES public.pets(id) NOT NULL,
    housing_type TEXT NOT NULL,
    ownership TEXT NOT NULL,
    reason TEXT NOT NULL,
    has_pets BOOLEAN NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.adoption_applications ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Anyone can read shelters and pets
CREATE POLICY "Public profiles are viewable by everyone." 
ON public.shelters FOR SELECT USING (true);

CREATE POLICY "Pets are viewable by everyone." 
ON public.pets FOR SELECT USING (true);

-- Authenticated users can insert their own adoption applications
CREATE POLICY "Users can insert their own applications." 
ON public.adoption_applications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can read their own applications
CREATE POLICY "Users can read own applications." 
ON public.adoption_applications FOR SELECT USING (auth.uid() = user_id);
