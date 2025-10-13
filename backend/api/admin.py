from django.contrib import admin
from .models import RoleTag, SimulationTopic, SimulationTopicType

admin.site.register(RoleTag)
admin.site.register(SimulationTopic)
admin.site.register(SimulationTopicType)
