from django.http import JsonResponse
import json
from .models import Simulation, SimulationTopicType, SimulationTopic, RoleTag, WeekTopic


def list_simulations(request):
    simulations = (
        Simulation.objects.all()
        .select_related(
            "week_topic",
            "role",
        )
        .prefetch_related(
            "simulation_topics",
        )
    )

    data = []
    for sim in simulations:
        data.append(
            {
                "id": sim.id,
                "title": str(sim),
                "author": sim.author,
                "url": sim.url,
                "week_topic": sim.week_topic.topic,
                "type": sim.type,
                "difficulty": sim.difficulty,
                "role": sim.role.name if sim.role else None,
                "simulation_topics": [
                    t.name for t in sim.simulation_topics.all()
                ],
            }
        )

    return JsonResponse(data, safe=False)


def list_simulation_topics(request):
    topic_types = SimulationTopicType.objects.all().order_by("serial_num", "name")
    result = []
    for topic_type in topic_types:
        topics = (
            SimulationTopic.objects.filter(type=topic_type)
            .order_by("name")
            .values_list("name", flat=True)
        )
        result.append(
            {
                "topicType": topic_type.name,
                "topics": list(topics),
                "color": topic_type.color,
            }
        )

    return JsonResponse(result, safe=False)


def list_role_tags(request):
    names = list(RoleTag.objects.all().order_by("name").values_list("name", flat=True))
    return JsonResponse(names, safe=False)


def list_week_topics(request):
    topics = list(
        WeekTopic.objects.all()
        .order_by("serial_num", "topic")
        .values_list("topic", flat=True)
    )
    return JsonResponse(topics, safe=False)


def list_all(request):
    simulations_resp = list_simulations(request)
    simulation_topics_resp = list_simulation_topics(request)
    role_tags_resp = list_role_tags(request)
    week_topics_resp = list_week_topics(request)

    data = {
        "simulations": json.loads(simulations_resp.content),
        "simulation_topics": json.loads(simulation_topics_resp.content),
        "role_tags": json.loads(role_tags_resp.content),
        "week_topics": json.loads(week_topics_resp.content),
    }

    return JsonResponse(data)
