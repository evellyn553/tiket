from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Event(models.Model):
    EVENT_CATEGORIES = [
        ('festival', 'Festival'),
        ('cosplay', 'Cosplay'),
        ('concert', 'Konser'),
        ('workshop', 'Workshop'),
        ('screening', 'Screening'),
    ]
    
    EVENT_STATUS = [
        ('upcoming', 'Akan Datang'),
        ('ongoing', 'Sedang Berlangsung'),
        ('completed', 'Selesai'),
        ('cancelled', 'Dibatalkan'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=EVENT_CATEGORIES)
    status = models.CharField(max_length=20, choices=EVENT_STATUS, default='upcoming')
    
    # Event Details
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    venue = models.CharField(max_length=200)
    location = models.CharField(max_length=300)
    capacity = models.PositiveIntegerField()
    
    # Pricing in Indonesian Rupiah
    price = models.DecimalField(max_digits=12, decimal_places=2, help_text="Harga dalam Rupiah")
    early_bird_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Harga early bird dalam Rupiah")
    early_bird_deadline = models.DateTimeField(null=True, blank=True)
    
    # Media
    featured_image = models.ImageField(upload_to='events/images/', null=True, blank=True)
    banner_image = models.ImageField(upload_to='events/banners/', null=True, blank=True)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events')
    
    # SEO and Display
    slug = models.SlugField(unique=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    
    # Additional Info
    tags = models.JSONField(default=list, blank=True)
    requirements = models.TextField(blank=True, help_text="Persyaratan untuk mengikuti acara")
    age_restriction = models.CharField(max_length=50, blank=True, help_text="Batasan umur")
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def is_early_bird_active(self):
        if self.early_bird_deadline:
            return timezone.now() < self.early_bird_deadline
        return False

    @property
    def current_price(self):
        if self.is_early_bird_active and self.early_bird_price:
            return self.early_bird_price
        return self.price

    @property
    def formatted_price(self):
        """Format price in Indonesian Rupiah"""
        price = self.current_price
        return f"Rp {price:,.0f}".replace(',', '.')

class CosplayCompetition(models.Model):
    COMPETITION_THEMES = [
        ('magical_girls', 'Magical Girls'),
        ('shounen_heroes', 'Pahlawan Shounen'),
        ('villains', 'Penjahat'),
        ('mecha', 'Mecha'),
        ('fantasy', 'Fantasy'),
        ('modern', 'Anime Modern'),
        ('classic', 'Anime Klasik'),
        ('original', 'Karakter Original'),
    ]

    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='cosplay_competition')
    theme = models.CharField(max_length=50, choices=COMPETITION_THEMES)
    prize_pool = models.DecimalField(max_digits=12, decimal_places=2, help_text="Total hadiah dalam Rupiah")
    first_prize = models.DecimalField(max_digits=12, decimal_places=2, help_text="Hadiah juara 1 dalam Rupiah")
    second_prize = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Hadiah juara 2 dalam Rupiah")
    third_prize = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True, help_text="Hadiah juara 3 dalam Rupiah")
    
    registration_deadline = models.DateTimeField()
    max_participants = models.PositiveIntegerField()
    rules = models.TextField(help_text="Aturan kompetisi")
    
    def __str__(self):
        return f"Kompetisi Cosplay - {self.event.title}"

class AnisongConcert(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='anisong_concert')
    artist_name = models.CharField(max_length=200)
    artist_bio = models.TextField()
    setlist = models.JSONField(default=list, blank=True, help_text="Daftar lagu yang akan dibawakan")
    duration_minutes = models.PositiveIntegerField(help_text="Durasi konser dalam menit")
    
    # Special features
    meet_and_greet = models.BooleanField(default=False, help_text="Tersedia sesi meet & greet")
    merchandise_available = models.BooleanField(default=True, help_text="Tersedia merchandise")
    live_streaming = models.BooleanField(default=False, help_text="Tersedia live streaming")
    
    def __str__(self):
        return f"Konser Anisong - {self.artist_name}"

class EventReview(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], help_text="Rating 1-5 bintang")
    comment = models.TextField(help_text="Komentar dan review")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['event', 'user']
        ordering = ['-created_at']

    def __str__(self):
        return f"Review untuk {self.event.title} oleh {self.user.username}"
