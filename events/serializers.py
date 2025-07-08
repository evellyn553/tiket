from rest_framework import serializers
from .models import Event, EventImage, CosplayCompetition, AnisongConcert, EventReview
from django.contrib.auth.models import User

class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image', 'caption', 'order']

class CosplayCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CosplayCompetition
        fields = [
            'theme', 'prize_pool', 'first_prize', 'second_prize', 'third_prize',
            'registration_deadline', 'max_participants', 'rules'
        ]

class AnisongConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnisongConcert
        fields = [
            'artist_name', 'artist_bio', 'setlist', 'duration_minutes',
            'meet_and_greet', 'merchandise_available', 'live_streaming'
        ]

class EventReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = EventReview
        fields = ['id', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user']

class EventListSerializer(serializers.ModelSerializer):
    current_price = serializers.ReadOnlyField()
    is_early_bird_active = serializers.ReadOnlyField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'category', 'status', 'start_date', 'end_date',
            'venue', 'location', 'price', 'current_price', 'is_early_bird_active',
            'featured_image', 'is_featured', 'slug'
        ]

class EventDetailSerializer(serializers.ModelSerializer):
    images = EventImageSerializer(many=True, read_only=True)
    cosplay_competition = CosplayCompetitionSerializer(read_only=True)
    anisong_concert = AnisongConcertSerializer(read_only=True)
    reviews = EventReviewSerializer(many=True, read_only=True)
    current_price = serializers.ReadOnlyField()
    is_early_bird_active = serializers.ReadOnlyField()
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'category', 'status',
            'start_date', 'end_date', 'venue', 'location', 'capacity',
            'price', 'early_bird_price', 'early_bird_deadline', 'current_price',
            'is_early_bird_active', 'featured_image', 'banner_image',
            'created_at', 'updated_at', 'slug', 'is_featured',
            'tags', 'requirements', 'age_restriction',
            'images', 'cosplay_competition', 'anisong_concert', 'reviews',
            'average_rating'
        ]
    
    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0

class EventCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title', 'description', 'category', 'start_date', 'end_date',
            'venue', 'location', 'capacity', 'price', 'early_bird_price',
            'early_bird_deadline', 'featured_image', 'banner_image',
            'slug', 'is_featured', 'tags', 'requirements', 'age_restriction'
        ]
    
    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)
