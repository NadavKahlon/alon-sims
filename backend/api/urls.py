from django.urls import path
from .views import list_simulations


urlpatterns = [
    path("simulations", list_simulations),
]
