from django.db import migrations, models


ORDER = [
    "סיטואציות",
    "תכונות נבחנות",
    "אנשים",
    "פקודות",
]

COLORS = {
    "אנשים": "#e53935",       # red
    "סיטואציות": "#8e24aa",   # purple
    "פקודות": "#1e88e5",      # blue
    "תכונות נבחנות": "#43a047", # green
}


def apply_serials_and_colors(apps, schema_editor):
    SimulationTopicType = apps.get_model("api", "SimulationTopicType")
    for index, name in enumerate(ORDER, start=1):
        try:
            obj = SimulationTopicType.objects.get(name=name)
        except SimulationTopicType.DoesNotExist:
            continue
        obj.serial_num = index
        obj.color = COLORS.get(name, obj.color)
        obj.save(update_fields=["serial_num", "color"]) 


def revert_serials_and_colors(apps, schema_editor):
    SimulationTopicType = apps.get_model("api", "SimulationTopicType")
    # Reset to neutral values
    SimulationTopicType.objects.all().update(serial_num=0, color="#9e9e9e")


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0008_weektopic_serial_and_reseed"),
    ]

    operations = [
        migrations.AddField(
            model_name="simulationtopictype",
            name="color",
            field=models.CharField(max_length=20, verbose_name="צבע", default="#9e9e9e"),
        ),
        migrations.AddField(
            model_name="simulationtopictype",
            name="serial_num",
            field=models.IntegerField(verbose_name="מספר סודר", default=0),
        ),
        migrations.AddIndex(
            model_name="simulationtopictype",
            index=models.Index(fields=["serial_num"], name="api_simtype_serial_idx"),
        ),
        migrations.RunPython(apply_serials_and_colors, reverse_code=revert_serials_and_colors),
    ]


