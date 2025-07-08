from djongo import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Event(models.Model):
    EVENT_CATEGORIES = [
        ('festival', 'Festival'),
        ('cosplay', 'Cosplay'),
        ('concert', 'Concert'),
        ('workshop', 'Workshop'),
        ('screening', 'Screening'),
    ]
    
    EVENT_STATUS = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
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
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    early_bird_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
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
    requirements = models.TextField(blank=True)
    age_restriction = models.CharField(max_length=50, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['category', 'status']),
            models.Index(fields=['start_date']),
            models.Index(fields=['is_featured']),
        ]

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

class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='events/gallery/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order']

class CosplayCompetition(models.Model):
    COMPETITION_THEMES = [
        ('magical_girls', 'Magical Girls'),
        ('shounen_heroes', 'Shounen Heroes'),
        ('villains', 'Villains'),
        ('mecha', 'Mecha'),
        ('fantasy', 'Fantasy'),
        ('modern', 'Modern Anime'),
        ('classic', 'Classic Anime'),
        ('original', 'Original Characters'),
    ]

    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='cosplay_competition')
    theme = models.CharField(max_length=50, choices=COMPETITION_THEMES)
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2)
    first_prize = models.DecimalField(max_digits=10, decimal_places=2)
    second_prize = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    third_prize = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    registration_deadline = models.DateTimeField()
    max_participants = models.PositiveIntegerField()
    rules = models.TextField()
    
    def __str__(self):
        return f"Cosplay Competition - {self.event.title}"

class AnisongConcert(models.Model):
    event = models.OneToOneField(Event, on_delete=models.CASCADE, related_name='anisong_concert')
    artist_name = models.CharField(max_length=200)
    artist_bio = models.TextField()
    setlist = models.JSONField(default=list, blank=True)
    duration_minutes = models.PositiveIntegerField()
    
    # Special features
    meet_and_greet = models.BooleanField(default=False)
    merchandise_available = models.BooleanField(default=True)
    live_streaming = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Anisong Concert - {self.artist_name}"

class EventReview(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['event', 'user']
        ordering = ['-created_at']

    def __str__(self):
        return f"Review for {self.event.title} by {self.user.username}"
