from django.urls import path
from .views import list_simulations, list_simulation_topics, list_role_tags


urlpatterns = [
    path("simulations", list_simulations),
    path("simulation_topics", list_simulation_topics),
    path("role_tags", list_role_tags),
]
