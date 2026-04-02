from rest_framework import serializers
from .models import User, CustomerProfile, Installation, Booking, Bill, UsageTelemetry

class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerProfile
        fields = ['address', 'phone']

class UserSerializer(serializers.ModelSerializer):
    customer_profile = CustomerProfileSerializer(read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'password', 'customer_profile']

    def create(self, validated_data):
        password = validated_data.pop('password', 'default123')
        role = validated_data.pop('role', 'customer')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.role = role
        user.save()
        return user

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

class BillSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.username', read_only=True)

    class Meta:
        model = Bill
        fields = ['id', 'client', 'client_name', 'bill_no', 'date', 'units', 'amount', 'loan', 'subsidy', 'downpayment', 'status']

class UsageTelemetrySerializer(serializers.ModelSerializer):
    class Meta:
        model = UsageTelemetry
        fields = '__all__'
