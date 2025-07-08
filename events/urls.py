from django.urls import path
from . import views

urlpatterns = [
    # Event CRUD
    path('', views.EventListView.as_view(), name='event-list'),
    path('create/', views.EventCreateView.as_view(), name='event-create'),
    path('<slug:slug>/', views.EventDetailView.as_view(), name='event-detail'),
    
    # Specialized event lists
    path('featured/', views.FeaturedEventsView.as_view(), name='featured-events'),
    path('upcoming/', views.UpcomingEventsView.as_view(), name='upcoming-events'),
    path('cosplay/', views.CosplayEventsView.as_view(), name='cosplay-events'),
    path('concerts/', views.AnisongConcertsView.as_view(), name='anisong-concerts'),
    
    # Reviews
    path('<uuid:event_id>/reviews/', views.EventReviewListCreateView.as_view(), name='event-reviews'),
    
    # Utility endpoints
    path('stats/', views.event_stats, name='event-stats'),
    path('search/', views.search_events, name='search-events'),
    path('<uuid:event_id>/favorite/', views.toggle_favorite_event, name='toggle-favorite'),
]
