from django.urls import path
from . import views

urlpatterns = [
    path('create-order/', views.create_order, name='create-order'),
    path('my-tickets/', views.my_tickets, name='my-tickets'),
    path('my-orders/', views.my_orders, name='my-orders'),
    path('confirm-payment/<uuid:order_id>/', views.confirm_payment, name='confirm-payment'),
]
