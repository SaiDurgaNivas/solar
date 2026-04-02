from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'installations', views.InstallationViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'bills', views.BillViewSet)
router.register(r'telemetry', views.UsageTelemetryViewSet)

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('', include(router.urls)),
]
