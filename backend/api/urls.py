from django.urls import path
from .views import list_simulations, list_simulations_topics, list_role_tags


urlpatterns = [
    path("simulations", list_simulations),
    path("topics", list_simulations_topics),
    path("role_tags", list_role_tags),
]
