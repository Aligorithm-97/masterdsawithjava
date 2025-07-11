# Supabase Storage Setup Guide

Bu rehber, Supabase Storage entegrasyonu için gerekli adımları açıklar.

## 1. Supabase Storage Bucket Oluşturma

### SQL Editor'da Storage Setup
Supabase Dashboard'da **SQL Editor** sekmesine gidin ve `supabase-storage-setup.sql` dosyasındaki SQL kodunu çalıştırın:

```sql
-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-images', 'post-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');

-- Create policy to allow public read access to images
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT USING (bucket_id = 'post-images');

-- Create policy to allow authenticated users to update their own images
CREATE POLICY "Allow authenticated users to update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'post-images' AND auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete their own images
CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'post-images' AND auth.role() = 'authenticated');
```

### Manuel Olarak Bucket Oluşturma (Alternatif)
1. Supabase Dashboard'da **Storage** sekmesine gidin
2. **New bucket** butonuna tıklayın
3. Bucket adı: `post-images`
4. **Public bucket** seçeneğini işaretleyin
5. **Create bucket** butonuna tıklayın

## 2. Storage Policies (Manuel Olarak)

Eğer SQL ile oluşturmadıysanız, Storage sekmesinde manuel olarak policies ekleyin:

### Insert Policy
- **Policy name**: Allow authenticated users to upload images
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'post-images'`

### Select Policy
- **Policy name**: Allow public read access to images
- **Allowed operation**: SELECT
- **Target roles**: public
- **Policy definition**: `bucket_id = 'post-images'`

### Update Policy
- **Policy name**: Allow authenticated users to update images
- **Allowed operation**: UPDATE
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'post-images'`

### Delete Policy
- **Policy name**: Allow authenticated users to delete images
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**: `bucket_id = 'post-images'`

## 3. Kullanım

### Admin Panel'de Resim Yükleme
1. `/admin` sayfasına gidin
2. Login olun (admin/admin123)
3. **+ Image** butonuna tıklayın
4. **Upload** butonuna tıklayın ve resim seçin
5. Resim otomatik olarak Supabase Storage'a yüklenecek
6. URL otomatik olarak doldurulacak

### Özellikler
- ✅ **Drag & Drop**: Resim dosyalarını sürükleyip bırakabilirsiniz
- ✅ **Preview**: Yüklenen resimler önizleme olarak gösterilir
- ✅ **Delete**: Resim üzerindeki ✕ butonu ile resmi kaldırabilirsiniz
- ✅ **Alt Text**: Resimler için alt text ekleyebilirsiniz
- ✅ **Public Access**: Yüklenen resimler herkese açık olarak erişilebilir

## 4. Dosya Yapısı

```
Storage Bucket: post-images/
├── [random-id].jpg
├── [random-id].png
├── [random-id].gif
└── [random-id].webp
```

## 5. Desteklenen Formatlar

- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- SVG (.svg)

## 6. Güvenlik

- Sadece authenticated kullanıcılar resim yükleyebilir
- Tüm kullanıcılar resimleri görüntüleyebilir
- Dosya boyutu limiti: 50MB (varsayılan)
- Dosya adları random olarak oluşturulur

## 7. Troubleshooting

### Resim Yüklenmiyor
1. Supabase URL ve key'in doğru olduğunu kontrol edin
2. Storage bucket'ın oluşturulduğunu kontrol edin
3. Policies'lerin doğru ayarlandığını kontrol edin
4. Browser console'da hata mesajlarını kontrol edin

### Resim Görüntülenmiyor
1. Resim URL'sinin doğru olduğunu kontrol edin
2. Storage bucket'ın public olduğunu kontrol edin
3. CORS ayarlarını kontrol edin

## 8. Gelecek Geliştirmeler

- [ ] Image compression
- [ ] Multiple image upload
- [ ] Image cropping/resizing
- [ ] CDN integration
- [ ] Image optimization
- [ ] Thumbnail generation 