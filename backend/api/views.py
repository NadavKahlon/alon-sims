from django.http import JsonResponse
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
    topic_types = SimulationTopicType.objects.all().order_by("name")
    data = {}
    for topic_type in topic_types:
        topics = (
            SimulationTopic.objects.filter(type=topic_type)
            .order_by("name")
            .values_list("name", flat=True)
        )
        data[topic_type.name] = list(topics)

    return JsonResponse(data)


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
