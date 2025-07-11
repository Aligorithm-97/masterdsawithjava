-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true);

-- Create policy to allow all users to upload images (for localStorage auth)
CREATE POLICY "Allow all users to upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'post-images');

-- Create policy to allow public read access to images
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT USING (bucket_id = 'post-images');

-- Create policy to allow all users to update images (for localStorage auth)
CREATE POLICY "Allow all users to update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'post-images');

-- Create policy to allow all users to delete images (for localStorage auth)
CREATE POLICY "Allow all users to delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'post-images'); 