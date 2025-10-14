from django.http import JsonResponse
import json
from .models import Simulation, SimulationTopicType, SimulationTopic, RoleTag, WeekTopic


def list_simulations(request):
    simulations = (
        Simulation.objects.all()
        .select_related(
            "main_sim_topic",
            "main_role_tag",
            "main_week",
        )
        .prefetch_related(
            "additional_sim_topics",
            "additional_role_tags",
            "additional_weeks",
        )
    )

    data = []
    for sim in simulations:
        data.append(
            {
                "id": sim.id,
                "title": str(sim),
                "url": sim.url,
                "main_sim_topic": sim.main_sim_topic.name,
                "main_role_tag": sim.main_role_tag.name if sim.main_role_tag else None,
                "type": sim.type,
                "main_week": sim.main_week.topic if sim.main_week else None,
                "difficulty": sim.difficulty,
                "additional_sim_topics": [
                    t.name for t in sim.additional_sim_topics.all()
                ],
                "additional_role_tags": [
                    t.name for t in sim.additional_role_tags.all()
                ],
                "additional_weeks": [w.topic for w in sim.additional_weeks.all()],
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
