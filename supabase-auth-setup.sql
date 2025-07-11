-- Enable Row Level Security (RLS) for posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts" ON posts
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to select posts
CREATE POLICY "Allow authenticated users to select posts" ON posts
FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update posts
CREATE POLICY "Allow authenticated users to update posts" ON posts
FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete posts
CREATE POLICY "Allow authenticated users to delete posts" ON posts
FOR DELETE USING (auth.role() = 'authenticated');

-- Create admin user (you can modify this)
-- Note: You'll need to create the user through Supabase Auth UI first
-- Then you can assign them admin role if needed 