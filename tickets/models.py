from django.db import models
from django.contrib.auth.models import User
from events.models import Event
import uuid

class Ticket(models.Model):
    TICKET_STATUS = [
        ('pending', 'Menunggu Pembayaran'),
        ('paid', 'Sudah Dibayar'),
        ('used', 'Sudah Digunakan'),
        ('cancelled', 'Dibatalkan'),
        ('refunded', 'Dikembalikan'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='tickets')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    
    # Ticket Details
    ticket_number = models.CharField(max_length=20, unique=True)
    quantity = models.PositiveIntegerField(default=1)
    unit_price = models.DecimalField(max_digits=12, decimal_places=2)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    
    # Status
    status = models.CharField(max_length=20, choices=TICKET_STATUS, default='pending')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    paid_at = models.DateTimeField(null=True, blank=True)
    used_at = models.DateTimeField(null=True, blank=True)
    
    # Additional Info
    notes = models.TextField(blank=True)
    qr_code = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Tiket {self.ticket_number} - {self.event.title}"

    def save(self, *args, **kwargs):
        if not self.ticket_number:
            self.ticket_number = f"TKT{str(self.id)[:8].upper()}"
        super().save(*args, **kwargs)

class TicketOrder(models.Model):
    ORDER_STATUS = [
        ('pending', 'Menunggu Pembayaran'),
        ('processing', 'Sedang Diproses'),
        ('completed', 'Selesai'),
        ('cancelled', 'Dibatalkan'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ticket_orders')
    order_number = models.CharField(max_length=20, unique=True)
    
    # Order Details
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')
    
    # Customer Info
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Order {self.order_number}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            self.order_number = f"ORD{str(self.id)[:8].upper()}"
        super().save(*args, **kwargs)
