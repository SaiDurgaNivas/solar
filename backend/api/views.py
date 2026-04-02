from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User, CustomerProfile, Installation, Booking, Bill, UsageTelemetry
from .serializers import UserSerializer, InstallationSerializer, BookingSerializer, BillSerializer, UsageTelemetrySerializer

@api_view(['POST'])
def login_view(request):
    """
    Dummy check representing our secure backend login. 
    In prod, this returns a JWT or sets a session cookie.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Please provide email and password'}, status=status.HTTP_400_BAD_REQUEST)

    # Simplified lookup for testing
    user = User.objects.filter(email=email).first()
    
    # Optional DB check, but if we want to honor our hardcoded demo fallback:
    if not user:
        if email == "admin@gmail.com":
            user, _ = User.objects.get_or_create(username="Admin", email=email, role="admin")
            user.set_password('admin123')
            user.save()
        elif email == "agent@gmail.com":
            user, _ = User.objects.get_or_create(username="Agent", email=email, role="agent")
            user.set_password('agent123')
            user.save()
        else:
            user, _ = User.objects.get_or_create(username=email.split('@')[0], email=email, role="customer")
            user.set_password(password)
            user.save()

    # Create dummy data on first customer creation
    if user.role == 'customer' and not Installation.objects.filter(client=user).exists():
        Installation.objects.create(system="5KW Residential Setup", status="Pending", client=user, location="Demo Site")
        Bill.objects.create(client=user, bill_no="B001", units=120, amount=1500, loan=500, subsidy=200, downpayment=800, status="Paid")
        Bill.objects.create(client=user, bill_no="B002", units=95, amount=1100, loan=400, subsidy=150, downpayment=550, status="Unpaid")
        Bill.objects.create(client=user, bill_no="B003", units=140, amount=1800, loan=700, subsidy=300, downpayment=800, status="Paid")
        UsageTelemetry.objects.create(client=user, monthly_avg=140, total_units=450, efficiency=91)

    serializer = UserSerializer(user)
    return Response({'user': serializer.data, 'token': 'dummy-token-for-now'})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        role_filter = self.request.query_params.get('role')
        if role_filter:
            return User.objects.filter(role=role_filter)
        return User.objects.all()

class InstallationViewSet(viewsets.ModelViewSet):
    queryset = Installation.objects.all()
    serializer_class = InstallationSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

    def get_queryset(self):
        client_id = self.request.query_params.get('client_id')
        if client_id:
            return Bill.objects.filter(client_id=client_id)
        return Bill.objects.all()

class UsageTelemetryViewSet(viewsets.ModelViewSet):
    queryset = UsageTelemetry.objects.all()
    serializer_class = UsageTelemetrySerializer

    def get_queryset(self):
        client_id = self.request.query_params.get('client_id')
        if client_id:
            return UsageTelemetry.objects.filter(client_id=client_id)
        return UsageTelemetry.objects.all()

from .models import WorkerAttendance
from .serializers import WorkerAttendanceSerializer

class WorkerAttendanceViewSet(viewsets.ModelViewSet):
    queryset = WorkerAttendance.objects.all()
    serializer_class = WorkerAttendanceSerializer

    def get_queryset(self):
        worker_id = self.request.query_params.get('worker_id')
        if worker_id:
            return WorkerAttendance.objects.filter(worker_id=worker_id)
        return WorkerAttendance.objects.all()
