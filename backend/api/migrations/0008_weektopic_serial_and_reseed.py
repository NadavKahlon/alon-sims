from django.db import migrations, models


WEEK_TOPICS_IN_ORDER = [
    "יסודות",
    "מנהיגות",
    "שבוע שטח",
    'סד"ח',
    "המקצוע הצבאי",
    "פיקוד וטיפול בפרט",
    "זהות",
    "סיכום",
]


def reseed_weektopics_with_serials(apps, schema_editor):
    WeekTopic = apps.get_model("api", "WeekTopic")

    # Remove all existing week topics
    WeekTopic.objects.all().delete()

    # Re-seed with serial numbers based on order (1-based indexing)
    objects = []
    for idx, topic in enumerate(WEEK_TOPICS_IN_ORDER, start=1):
        objects.append(WeekTopic(topic=topic, serial_num=idx))
    WeekTopic.objects.bulk_create(objects)


def undo_reseed_weektopics(apps, schema_editor):
    WeekTopic = apps.get_model("api", "WeekTopic")
    WeekTopic.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_simulation_main_role_tag_and_more"),
    ]

    operations = [
        # Add the serial_num field as nullable first to allow population
        migrations.AddField(
            model_name="weektopic",
            name="serial_num",
            field=models.IntegerField(verbose_name="מספר סודר", null=True),
        ),
        migrations.RunPython(
            reseed_weektopics_with_serials, reverse_code=undo_reseed_weektopics
        ),
        # Make the field non-nullable after data is in place
        migrations.AlterField(
            model_name="weektopic",
            name="serial_num",
            field=models.IntegerField(verbose_name="מספר סודר", null=False),
        ),
    ]
