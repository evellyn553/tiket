from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from django.contrib.auth.models import User
from events.models import Event
from .models import Ticket, TicketOrder
from .serializers import TicketSerializer, TicketOrderSerializer
import uuid
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def create_order(request):
    """Create a new ticket order"""
    try:
        event_id = request.data.get('event_id')
        quantity = int(request.data.get('quantity', 1))
        customer_name = request.data.get('customer_name')
        customer_email = request.data.get('customer_email')
        customer_phone = request.data.get('customer_phone')
        payment_method = request.data.get('payment_method', 'gopay')
        notes = request.data.get('notes', '')

        # Get event
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({'error': 'Acara tidak ditemukan'}, status=status.HTTP_404_NOT_FOUND)

        # Calculate total
        unit_price = event.current_price
        admin_fee = Decimal('5000.00')
        total_amount = (unit_price * quantity) + admin_fee

        # Create order
        order = TicketOrder.objects.create(
            user=request.user if request.user.is_authenticated else None,
            total_amount=total_amount,
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            status='pending'
        )

        # Create tickets
        tickets = []
        for i in range(quantity):
            ticket = Ticket.objects.create(
                event=event,
                user=request.user if request.user.is_authenticated else None,
                quantity=1,
                unit_price=unit_price,
                total_price=unit_price,
                status='pending'
            )
            tickets.append(ticket)

        return Response({
            'order_id': order.id,
            'order_number': order.order_number,
            'total_amount': total_amount,
            'payment_method': payment_method,
            'tickets': [{'id': t.id, 'ticket_number': t.ticket_number} for t in tickets],
            'message': 'Pesanan berhasil dibuat. Silakan lakukan pembayaran.'
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_tickets(request):
    """Get user's tickets"""
    try:
        tickets = Ticket.objects.filter(user=request.user).order_by('-created_at')
        serializer = TicketSerializer(tickets, many=True)
        return Response({'results': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    """Get user's orders"""
    try:
        orders = TicketOrder.objects.filter(user=request.user).order_by('-created_at')
        serializer = TicketOrderSerializer(orders, many=True)
        return Response({'results': serializer.data})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request, order_id):
    """Confirm payment for an order"""
    try:
        order = TicketOrder.objects.get(id=order_id, user=request.user)
        
        # Update order status
        order.status = 'completed'
        order.save()

        # Update ticket status
        tickets = Ticket.objects.filter(user=request.user, status='pending')
        for ticket in tickets:
            ticket.status = 'paid'
            ticket.save()

        return Response({'message': 'Pembayaran berhasil dikonfirmasi'})

    except TicketOrder.DoesNotExist:
        return Response({'error': 'Pesanan tidak ditemukan'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
