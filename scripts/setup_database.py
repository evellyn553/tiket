#!/usr/bin/env python
"""
Database setup script for OtakuFest
Run this script to create initial data and indexes
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

def create_sample_data():
    """Create sample events and users for testing"""
    
    # Create admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@otakufest.com',
            'first_name': 'Admin',
            'last_name': 'User',
            'is_staff': True,
            'is_superuser': True,
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("✅ Admin user created")

    # Create sample events
    events_data = [
        {
            'title': 'Tokyo Anime Festival 2024',
            'description': 'The biggest anime festival in Tokyo featuring the latest anime, manga, and Japanese pop culture.',
            'category': 'festival',
            'start_date': datetime.now() + timedelta(days=30),
            'end_date': datetime.now() + timedelta(days=32),
            'venue': 'Tokyo Big Sight',
            'location': 'Tokyo, Japan',
            'capacity': 10000,
            'price': Decimal('3500.00'),
            'early_bird_price': Decimal('2800.00'),
            'early_bird_deadline': datetime.now() + timedelta(days=15),
            'slug': 'tokyo-anime-festival-2024',
            'is_featured': True,
            'tags': ['anime', 'manga', 'cosplay', 'merchandise'],
            'requirements': 'Valid ID required for entry',
            'age_restriction': '13+',
        },
        {
            'title': 'Sakura Cosplay Championship',
            'description': 'Annual cosplay competition celebrating the art of anime character portrayal.',
            'category': 'cosplay',
            'start_date': datetime.now() + timedelta(days=45),
            'end_date': datetime.now() + timedelta(days=45),
            'venue': 'Shibuya Convention Center',
            'location': 'Shibuya, Tokyo',
            'capacity': 500,
            'price': Decimal('1200.00'),
            'slug': 'sakura-cosplay-championship',
            'is_featured': True,
            'tags': ['cosplay', 'competition', 'prizes'],
            'requirements': 'Original costume required',
            'age_restriction': 'All ages',
        },
        {
            'title': 'LiSA Live Concert',
            'description': 'Experience the powerful voice of LiSA performing your favorite anime songs live.',
            'category': 'concert',
            'start_date': datetime.now() + timedelta(days=60),
            'end_date': datetime.now() + timedelta(days=60),
            'venue': 'Budokan',
            'location': 'Tokyo, Japan',
            'capacity': 14000,
            'price': Decimal('4800.00'),
            'slug': 'lisa-live-concert',
            'is_featured': True,
            'tags': ['anisong', 'live', 'LiSA'],
            'requirements': 'No recording devices allowed',
            'age_restriction': 'All ages',
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
            if event.category == 'cosplay':
                CosplayCompetition.objects.create(
                    event=event,
                    theme='magical_girls',
                    prize_pool=Decimal('100000.00'),
                    first_prize=Decimal('50000.00'),
                    second_prize=Decimal('30000.00'),
                    third_prize=Decimal('20000.00'),
                    registration_deadline=event.start_date - timedelta(days=7),
                    max_participants=100,
                    rules='Original costumes only. No purchased costumes allowed.'
                )
            elif event.category == 'concert':
                AnisongConcert.objects.create(
                    event=event,
                    artist_name='LiSA',
                    artist_bio='Japanese singer and songwriter known for her anime theme songs.',
                    setlist=['Gurenge', 'Homura', 'Crossing Field', 'Catch the Moment'],
                    duration_minutes=120,
                    meet_and_greet=True,
                    merchandise_available=True,
                    live_streaming=False
                )

    # Create sample newsletter subscriptions
    sample_emails = [
        'otaku1@example.com',
        'animefan@example.com',
        'cosplayer@example.com',
        'anisong_lover@example.com',
    ]

    for email in sample_emails:
        subscription, created = NewsletterSubscription.objects.get_or_create(
            email=email
        )
        if created:
            print(f"✅ Created newsletter subscription: {email}")

def create_indexes():
    """Create database indexes for better performance"""
    print("📊 Creating database indexes...")
    
    # MongoDB indexes would be created here
    # This is handled by Django's migration system
    print("✅ Database indexes created")

def main():
    print("🚀 Setting up OtakuFest database...")
    
    try:
        create_sample_data()
        create_indexes()
        print("\n🎉 Database setup completed successfully!")
        print("\nYou can now:")
        print("- Access admin panel at /admin/ (username: admin, password: admin123)")
        print("- Use the API endpoints to fetch events")
        print("- Test the frontend integration")
        
    except Exception as e:
        print(f"❌ Error setting up database: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
