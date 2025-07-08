from rest_framework import generics, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q, Avg
from .models import Event, EventReview, CosplayCompetition, AnisongConcert
from .serializers import (
    EventListSerializer, EventDetailSerializer, EventCreateSerializer,
    EventReviewSerializer, CosplayCompetitionSerializer, AnisongConcertSerializer
)
import django_filters

class EventFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category')
    status = django_filters.CharFilter(field_name='status')
    start_date_after = django_filters.DateTimeFilter(field_name='start_date', lookup_expr='gte')
    start_date_before = django_filters.DateTimeFilter(field_name='start_date', lookup_expr='lte')
    price_min = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price_max = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    
    class Meta:
        model = Event
        fields = ['category', 'status', 'is_featured']

class EventListView(generics.ListAPIView):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = EventFilter
    search_fields = ['title', 'description', 'venue', 'location']
    ordering_fields = ['start_date', 'created_at', 'price']
    ordering = ['-created_at']

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.filter(is_published=True)
    serializer_class = EventDetailSerializer
    lookup_field = 'slug'

class EventCreateView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventCreateSerializer
    permission_classes = [IsAuthenticated]

class FeaturedEventsView(generics.ListAPIView):
    queryset = Event.objects.filter(is_featured=True, is_published=True)
    serializer_class = EventListSerializer

class UpcomingEventsView(generics.ListAPIView):
    serializer_class = EventListSerializer
    
    def get_queryset(self):
        return Event.objects.filter(
            start_date__gte=timezone.now(),
            is_published=True
        ).order_by('start_date')

class CosplayEventsView(generics.ListAPIView):
    serializer_class = EventListSerializer
    
    def get_queryset(self):
        return Event.objects.filter(
            category='cosplay',
            is_published=True
        ).order_by('start_date')

class AnisongConcertsView(generics.ListAPIView):
    serializer_class = EventListSerializer
    
    def get_queryset(self):
        return Event.objects.filter(
            category='concert',
            is_published=True
        ).order_by('start_date')

class EventReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = EventReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return EventReview.objects.filter(event_id=event_id)
    
    def perform_create(self, serializer):
        event_id = self.kwargs['event_id']
        serializer.save(user=self.request.user, event_id=event_id)

@api_view(['GET'])
def event_stats(request):
    """Get general statistics about events"""
    total_events = Event.objects.filter(is_published=True).count()
    upcoming_events = Event.objects.filter(
        start_date__gte=timezone.now(),
        is_published=True
    ).count()
    
    categories_stats = {}
    for category, _ in Event.EVENT_CATEGORIES:
        count = Event.objects.filter(category=category, is_published=True).count()
        categories_stats[category] = count
    
    return Response({
        'total_events': total_events,
        'upcoming_events': upcoming_events,
        'categories': categories_stats
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_favorite_event(request, event_id):
    """Toggle favorite status for an event"""
    try:
        event = Event.objects.get(id=event_id)
        user = request.user
        
        # This would require a UserProfile model with favorite_events field
        # For now, return a simple response
        return Response({
            'message': 'Favorite toggled successfully',
            'is_favorite': True  # This should be actual logic
        })
    except Event.DoesNotExist:
        return Response(
            {'error': 'Event not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
def search_events(request):
    """Advanced search for events"""
    query = request.GET.get('q', '')
    category = request.GET.get('category', '')
    location = request.GET.get('location', '')
    date_from = request.GET.get('date_from', '')
    date_to = request.GET.get('date_to', '')
    
    events = Event.objects.filter(is_published=True)
    
    if query:
        events = events.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(venue__icontains=query)
        )
    
    if category:
        events = events.filter(category=category)
    
    if location:
        events = events.filter(location__icontains=location)
    
    if date_from:
        events = events.filter(start_date__gte=date_from)
    
    if date_to:
        events = events.filter(start_date__lte=date_to)
    
    serializer = EventListSerializer(events, many=True)
    return Response(serializer.data)
