# Supabase Auth Setup Guide

Bu rehber, Supabase Authentication entegrasyonu için gerekli adımları açıklar.

## 1. Supabase Auth Kurulumu

### SQL Editor'da Auth Setup
Supabase Dashboard'da **SQL Editor** sekmesine gidin ve `supabase-auth-setup.sql` dosyasındaki SQL kodunu çalıştırın:

```sql
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
```

## 2. Supabase Auth Ayarları

### Authentication Settings
1. Supabase Dashboard'da **Authentication** sekmesine gidin
2. **Settings** alt sekmesine tıklayın
3. **Enable email confirmations** seçeneğini kapatın (development için)
4. **Site URL**'yi ayarlayın: `http://localhost:3000`
5. **Redirect URLs**'e şunları ekleyin:
   - `http://localhost:3000/admin`
   - `http://localhost:3000/login`

### Email Templates (Opsiyonel)
1. **Email Templates** sekmesine gidin
2. **Confirm signup** template'ini özelleştirin
3. **Magic Link** template'ini özelleştirin

## 3. Kullanım

### İlk Kullanıcı Oluşturma
1. `/login` sayfasına gidin
2. **Create Account** butonuna tıklayın
3. Email ve şifre girin
4. Email'inizi kontrol edin ve onaylayın
5. Tekrar login olun

### Admin Panel Erişimi
1. `/login` sayfasına gidin
2. Email ve şifrenizi girin
3. **Sign In** butonuna tıklayın
4. Otomatik olarak `/admin` sayfasına yönlendirileceksiniz

### Logout
1. Admin panelinde **Logout** butonuna tıklayın
2. Otomatik olarak `/login` sayfasına yönlendirileceksiniz

## 4. Özellikler

### Authentication Features
- ✅ **Email/Password Authentication**: Standart email ve şifre ile giriş
- ✅ **Account Creation**: Yeni hesap oluşturma
- ✅ **Session Management**: Otomatik session yönetimi
- ✅ **Real-time Auth State**: Gerçek zamanlı authentication durumu
- ✅ **Secure Logout**: Güvenli çıkış işlemi
- ✅ **User Information**: Kullanıcı bilgilerini görüntüleme

### Security Features
- ✅ **Row Level Security (RLS)**: Veritabanı seviyesinde güvenlik
- ✅ **Authenticated Access**: Sadece giriş yapmış kullanıcılar erişebilir
- ✅ **Session Validation**: Otomatik session doğrulama
- ✅ **Secure Storage**: Güvenli veri saklama

## 5. Dosya Yapısı

```
├── app/
│   ├── login/
│   │   └── page.tsx          # Login/Signup sayfası
│   ├── admin/
│   │   └── page.tsx          # Admin panel (auth korumalı)
│   └── components/
│       └── Navigation.tsx    # Navigation (auth durumu)
├── lib/
│   └── supabase.ts           # Supabase client
├── supabase-auth-setup.sql   # Auth SQL setup
└── .env.local                # Environment variables
```

## 6. Environment Variables

`.env.local` dosyanızda şu değişkenler olmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 7. Troubleshooting

### Login Çalışmıyor
1. Email'in doğru olduğunu kontrol edin
2. Şifrenin doğru olduğunu kontrol edin
3. Email onayının yapıldığını kontrol edin
4. Supabase URL ve key'in doğru olduğunu kontrol edin

### Admin Panel'e Erişemiyorum
1. Login olduğunuzdan emin olun
2. Browser console'da hata mesajlarını kontrol edin
3. Supabase Dashboard'da kullanıcının oluşturulduğunu kontrol edin

### Session Kayboluyor
1. Browser'ı yenileyin
2. Login sayfasına gidin ve tekrar giriş yapın
3. Supabase Auth settings'lerini kontrol edin

## 8. Gelecek Geliştirmeler

- [ ] Password reset functionality
- [ ] Social authentication (Google, GitHub)
- [ ] User roles and permissions
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] User profile management
- [ ] Admin user management

## 9. Güvenlik Notları

- Production'da email confirmation'ı açın
- Güçlü şifre politikası uygulayın
- Rate limiting ekleyin
- HTTPS kullanın
- Regular security audits yapın 