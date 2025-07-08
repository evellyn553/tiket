#!/usr/bin/env python
"""
Database setup script for OtakuFest with SQLite
Run this script to create initial data with Indonesian content and Rupiah currency
"""

import os
import sys
import django
from datetime import datetime, timedelta
from decimal import Decimal

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'otakufest_backend.settings')
django.setup()

from django.contrib.auth.models import User
from events.models import Event, CosplayCompetition, AnisongConcert
from users.models import UserProfile, NewsletterSubscription

def create_indonesian_sample_data():
    """Create sample events and users for Indonesian market"""
    
    # Create admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@otakufest.id',
            'first_name': 'Admin',
            'last_name': 'OtakuFest',
            'is_staff': True,
            'is_superuser': True,
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("✅ Admin user created")

    # Create Indonesian sample events
    events_data = [
        {
            'title': 'Festival Anime Jakarta 2024',
            'description': 'Festival anime terbesar di Jakarta yang menampilkan anime, manga, dan budaya pop Jepang terbaru. Nikmati berbagai booth merchandise, kompetisi cosplay, dan meet & greet dengan voice actor terkenal.',
            'category': 'festival',
            'start_date': datetime.now() + timedelta(days=30),
            'end_date': datetime.now() + timedelta(days=32),
            'venue': 'Jakarta Convention Center',
            'location': 'Jakarta Pusat, DKI Jakarta',
            'capacity': 15000,
            'price': Decimal('125000.00'),
            'early_bird_price': Decimal('99000.00'),
            'early_bird_deadline': datetime.now() + timedelta(days=15),
            'slug': 'festival-anime-jakarta-2024',
            'is_featured': True,
            'tags': ['anime', 'manga', 'cosplay', 'merchandise', 'voice-actor'],
            'requirements': 'KTP/Kartu Pelajar diperlukan untuk masuk',
            'age_restriction': '13+',
        },
        {
            'title': 'Kompetisi Cosplay Sakura Bandung',
            'description': 'Kompetisi cosplay tahunan yang merayakan seni perwujudan karakter anime. Tunjukkan kreativitas dan kemampuan acting Anda dalam kompetisi bergengsi ini.',
            'category': 'cosplay',
            'start_date': datetime.now() + timedelta(days=45),
            'end_date': datetime.now() + timedelta(days=45),
            'venue': 'Taman Budaya Bandung',
            'location': 'Bandung, Jawa Barat',
            'capacity': 500,
            'price': Decimal('50000.00'),
            'slug': 'kompetisi-cosplay-sakura-bandung',
            'is_featured': True,
            'tags': ['cosplay', 'kompetisi', 'hadiah', 'kreativitas'],
            'requirements': 'Kostum original wajib, tidak boleh kostum beli jadi',
            'age_restriction': 'Semua umur',
        },
        {
            'title': 'Konser Anisong Live Jakarta',
            'description': 'Rasakan pengalaman mendengarkan lagu-lagu anime favorit secara langsung dari artis-artis ternama Jepang. Konser spektakuler dengan teknologi sound system terdepan.',
            'category': 'concert',
            'start_date': datetime.now() + timedelta(days=60),
            'end_date': datetime.now() + timedelta(days=60),
            'venue': 'Istora Senayan',
            'location': 'Jakarta Selatan, DKI Jakarta',
            'capacity': 8000,
            'price': Decimal('200000.00'),
            'early_bird_price': Decimal('175000.00'),
            'early_bird_deadline': datetime.now() + timedelta(days=30),
            'slug': 'konser-anisong-live-jakarta',
            'is_featured': True,
            'tags': ['anisong', 'live', 'konser', 'musik-anime'],
            'requirements': 'Dilarang membawa alat perekam',
            'age_restriction': 'Semua umur',
        },
        {
            'title': 'Workshop Menggambar Manga Surabaya',
            'description': 'Belajar teknik menggambar manga dari seniman profesional. Workshop intensif selama 2 hari dengan materi lengkap dari dasar hingga teknik advanced.',
            'category': 'workshop',
            'start_date': datetime.now() + timedelta(days=25),
            'end_date': datetime.now() + timedelta(days=26),
            'venue': 'Universitas Airlangga',
            'location': 'Surabaya, Jawa Timur',
            'capacity': 50,
            'price': Decimal('300000.00'),
            'slug': 'workshop-menggambar-manga-surabaya',
            'is_featured': False,
            'tags': ['workshop', 'manga', 'menggambar', 'edukasi'],
            'requirements': 'Bawa alat gambar sendiri',
            'age_restriction': '16+',
        },
        {
            'title': 'Screening Film Anime Terbaru Yogyakarta',
            'description': 'Nonton bareng film anime terbaru dengan subtitle Indonesia. Dilengkapi dengan diskusi dan review bersama komunitas anime Yogyakarta.',
            'category': 'screening',
            'start_date': datetime.now() + timedelta(days=20),
            'end_date': datetime.now() + timedelta(days=20),
            'venue': 'Cinema XXI Malioboro',
            'location': 'Yogyakarta, DIY',
            'capacity': 200,
            'price': Decimal('75000.00'),
            'slug': 'screening-anime-yogyakarta',
            'is_featured': False,
            'tags': ['screening', 'film-anime', 'diskusi', 'komunitas'],
            'requirements': 'Tiket sudah termasuk popcorn dan minuman',
            'age_restriction': '17+',
        },
        {
            'title': 'Festival Cosplay Medan 2024',
            'description': 'Festival cosplay terbesar di Sumatera Utara. Kompetisi, parade, dan workshop cosplay dengan peserta dari seluruh Indonesia.',
            'category': 'cosplay',
            'start_date': datetime.now() + timedelta(days=50),
            'end_date': datetime.now() + timedelta(days=51),
            'venue': 'Grand Palladium Mall',
            'location': 'Medan, Sumatera Utara',
            'capacity': 1000,
            'price': Decimal('85000.00'),
            'early_bird_price': Decimal('65000.00'),
            'early_bird_deadline': datetime.now() + timedelta(days=25),
            'slug': 'festival-cosplay-medan-2024',
            'is_featured': True,
            'tags': ['cosplay', 'festival', 'parade', 'workshop'],
            'requirements': 'Kostum harus sesuai tema anime/manga/game',
            'age_restriction': 'Semua umur',
        }
    ]

    for event_data in events_data:
        event, created = Event.objects.get_or_create(
            slug=event_data['slug'],
            defaults={**event_data, 'created_by': admin_user}
        )
        if created:
            print(f"✅ Created event: {event.title}")

            # Add specific competition/concert details
            if event.category == 'cosplay' and 'kompetisi' in event.title.lower():
                CosplayCompetition.objects.create(
                    event=event,
                    theme='magical_girls',
                    prize_pool=Decimal('5000000.00'),
                    first_prize=Decimal('2500000.00'),
                    second_prize=Decimal('1500000.00'),
                    third_prize=Decimal('1000000.00'),
                    registration_deadline=event.start_date - timedelta(days=7),
                    max_participants=100,
                    rules='Kostum original saja. Tidak boleh kostum beli jadi. Penilaian berdasarkan kreativitas, akurasi karakter, dan performance.'
                )
            elif event.category == 'concert':
                AnisongConcert.objects.create(
                    event=event,
                    artist_name='Various Artists',
                    artist_bio='Kolaborasi artis-artis anisong terbaik dari Jepang yang akan membawakan lagu-lagu anime populer.',
                    setlist=['Gurenge (Demon Slayer)', 'Unravel (Tokyo Ghoul)', 'Silhouette (Naruto)', 'Cruel Angel Thesis (Evangelion)'],
                    duration_minutes=150,
                    meet_and_greet=True,
                    merchandise_available=True,
                    live_streaming=False
                )

    # Create Indonesian newsletter subscriptions
    sample_emails = [
        'otaku.jakarta@gmail.com',
        'animefan.bandung@yahoo.com',
        'cosplayer.surabaya@gmail.com',
        'anisong.medan@outlook.com',
        'manga.yogya@gmail.com',
    ]

    for email in sample_emails:
        subscription, created = NewsletterSubscription.objects.get_or_create(
            email=email
        )
        if created:
            print(f"✅ Created newsletter subscription: {email}")

    # Create sample user profiles
    sample_users = [
        {
            'username': 'otaku_jakarta',
            'email': 'otaku.jakarta@gmail.com',
            'first_name': 'Andi',
            'last_name': 'Wijaya',
            'profile_data': {
                'bio': 'Otaku sejati dari Jakarta yang suka anime shounen dan cosplay',
                'location': 'Jakarta',
                'favorite_anime': ['Naruto', 'One Piece', 'Attack on Titan'],
                'favorite_genres': ['shounen', 'action', 'adventure'],
                'otaku_level': 'hardcore',
                'instagram_handle': '@otaku_jkt',
                'events_attended': 15,
                'cosplay_competitions_joined': 5,
            }
        },
        {
            'username': 'cosplay_queen',
            'email': 'cosplayer.surabaya@gmail.com',
            'first_name': 'Sari',
            'last_name': 'Kusuma',
            'profile_data': {
                'bio': 'Professional cosplayer dan content creator',
                'location': 'Surabaya',
                'favorite_anime': ['Sailor Moon', 'Cardcaptor Sakura', 'Madoka Magica'],
                'favorite_genres': ['magical girl', 'shoujo', 'fantasy'],
                'otaku_level': 'legendary',
                'instagram_handle': '@cosplay_queen_sby',
                'events_attended': 25,
                'cosplay_competitions_joined': 12,
            }
        }
    ]

    for user_data in sample_users:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
                'first_name': user_data['first_name'],
                'last_name': user_data['last_name'],
            }
        )
        if created:
            user.set_password('password123')
            user.save()
            
            # Update user profile
            profile = user.userprofile
            for key, value in user_data['profile_data'].items():
                setattr(profile, key, value)
            profile.save()
            
            print(f"✅ Created user: {user.username}")

def main():
    print("🚀 Setting up OtakuFest Indonesia database with SQLite...")
    
    try:
        create_indonesian_sample_data()
        print("\n🎉 Database setup completed successfully!")
        print("\nInformasi Login:")
        print("- Admin panel: /admin/ (username: admin, password: admin123)")
        print("- Sample user: otaku_jakarta (password: password123)")
        print("- Sample user: cosplay_queen (password: password123)")
        print("\nFitur yang tersedia:")
        print("- 6 acara sample dengan lokasi di Indonesia")
        print("- Harga dalam Rupiah")
        print("- Konten dalam Bahasa Indonesia")
        print("- API endpoints siap digunakan")
        print("- Database SQLite siap digunakan")
        
    except Exception as e:
        print(f"❌ Error setting up database: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
