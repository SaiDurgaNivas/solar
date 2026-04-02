from rest_framework import serializers
from .models import User, CustomerProfile, Installation, Booking

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ['address', 'phone']

class UserSerializer(serializers.ModelSerializer):
    customer_profile = CustomerProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'customer_profile']

class InstallationSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)
    agent_name = serializers.CharField(source='agent.username', read_only=True)

    class Meta:
        model = Installation
        fields = ['id', 'system', 'status', 'client', 'client_name', 'agent', 'agent_name', 'date', 'location']

class BookingSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'client', 'client_name', 'service_type', 'date', 'notes']
