from django.urls import path
from .views import list_simulations, list_simulations_topics


urlpatterns = [
    path("simulations", list_simulations),
    path("topics", list_simulations_topics),
]
