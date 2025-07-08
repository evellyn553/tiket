from djongo import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid

class UserProfile(models.Model):
    OTAKU_LEVELS = [
        ('newbie', 'Newbie Otaku'),
        ('casual', 'Casual Fan'),
        ('enthusiast', 'Enthusiast'),
        ('hardcore', 'Hardcore Otaku'),
        ('legendary', 'Legendary Otaku'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Profile Info
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=100, blank=True)
    
    # Otaku Preferences
    favorite_anime = models.JSONField(default=list, blank=True)
    favorite_genres = models.JSONField(default=list, blank=True)
    otaku_level = models.CharField(max_length=20, choices=OTAKU_LEVELS, default='newbie')
    
    # Social
    instagram_handle = models.CharField(max_length=50, blank=True)
    twitter_handle = models.CharField(max_length=50, blank=True)
    discord_username = models.CharField(max_length=50, blank=True)
    
    # Preferences
    newsletter_subscribed = models.BooleanField(default=True)
    event_notifications = models.BooleanField(default=True)
    cosplay_notifications = models.BooleanField(default=False)
    concert_notifications = models.BooleanField(default=False)
    
    # Stats
    events_attended = models.PositiveIntegerField(default=0)
    cosplay_competitions_joined = models.PositiveIntegerField(default=0)
    concerts_attended = models.PositiveIntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    @property
    def full_name(self):
        return f"{self.user.first_name} {self.user.last_name}".strip()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

class FavoriteEvent(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorite_events')
    event = models.ForeignKey('events.Event', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'event']

class EventAttendance(models.Model):
    ATTENDANCE_STATUS = [
        ('registered', 'Registered'),
        ('attended', 'Attended'),
        ('no_show', 'No Show'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='event_attendances')
    event = models.ForeignKey('events.Event', on_delete=models.CASCADE, related_name='attendances')
    status = models.CharField(max_length=20, choices=ATTENDANCE_STATUS, default='registered')
    registered_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'event']

class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.email
