from django.db import migrations, models


WEEK_TOPICS = [
    "יסודות",
    "מנהיגות",
    "שבוע שטח",
    'סד"ח',
    "המקצוע הצבאי",
    "פיקוד וטיפול בפרט",
    "זהות",
    "סיכום",
    'הגנ"ש',
]


def seed_weektopics(apps, schema_editor):
    WeekTopic = apps.get_model("api", "WeekTopic")
    for name in WEEK_TOPICS:
        WeekTopic.objects.update_or_create(topic=name, defaults={"topic": name})


def unseed_weektopics(apps, schema_editor):
    WeekTopic = apps.get_model("api", "WeekTopic")
    WeekTopic.objects.filter(topic__in=WEEK_TOPICS).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_seed_initial_data"),
    ]

    operations = [
        migrations.CreateModel(
            name="WeekTopic",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "topic",
                    models.CharField(max_length=80, unique=True, verbose_name="נושא"),
                ),
            ],
            options={
                "verbose_name": "נושא שבוע",
                "verbose_name_plural": "נושאי שבוע",
                "indexes": [
                    models.Index(fields=["topic"], name="api_weektopic_topic_idx"),
                ],
            },
        ),
        migrations.RunPython(seed_weektopics, reverse_code=unseed_weektopics),
    ]
