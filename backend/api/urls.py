from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'installations', views.InstallationViewSet)
router.register(r'bookings', views.BookingViewSet)

urlpatterns = [
    path('auth/login/', views.login_view, name='login'),
    path('', include(router.urls)),
]
