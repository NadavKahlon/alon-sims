from django.db import migrations


ROLE_TAGS = [
    'חבצלות',
    'אפסילון',
    'בינה',
    'ברקים',
    'גבישים',
    'חבצלות',
    'סילון',
    'צמרת',
    'תלפיות',
    'עתודאי רגיל',
    'אקדמיזציה',
    'רפואה',
    'רפואת שיניים',
    'טכנולוגיה',
    'סייבר',
    'גאמ"א',
    'ניהול מוצר',
    'תכנות',
    'הנדסה',
]
SIMULATION_TOPICS = {
    'אנשים': [
        'התנהלות עם רמה ממונה',
        'התנהלות עם פקודים',
        'התנהלות עם עמיתים',
        'התנהלות עם חיילים אחרים',
        'התנהלות עם הורים של פקוד',
    ],
    'פקודות': [
        'השירות המשותף',
        'ב"מ',
        'צ"ש',
        'ברה"ן',
        'עבירות פליליות',
        'זכויות החייל',
        'רפואה',
        'פוליטיקה',
    ],
    'תכונות נבחנות': [
        'מקצועיות',
        'אסרטיביות',
        'חוסן',
        'רגישות',
        'אחריות',
        'קור רוח',
        'סבלנות',
        'בטחון עצמי',
        'כושר ביטוי',
        'סמכותיות',
        'קבלת החלטות',
        'רתימת עמיתים',
        'תפקוד תחת לחץ',
        'התמודדות עם בלת"מים',
        'מערכתיות',
        'אכפתיות',
        'קבלת ביקורת',
    ],
    'סיטואציות': [
        'סירוב פקודה',
        'ראיון',
        'אמינות הפקוד',
        'זלזול הפקוד',
        'מרחק פיקודי',
        'אכזבת פקוד',
        'שקיפות עם פקוד',
        'עירור מוטיבציה',
        'פיתוח פקודים',
        'אנשים מול משימה',
        'התמודדות עם נזיפה',
        'ניהול שיחה קשה',
        'שבירת היררכיית הפו"ש',
        'עבודה מול חברים',
        'ניהול מחלוקות',
        'לקיחת אחריות',
        'החייל במרחב הציבורי',
        'מתן ביקורת',
        'יציאת חייל לקצונה',
    ],
}


def seed_data(apps, schema_editor):
    RoleTag = apps.get_model('api', 'RoleTag')
    SimulationTopicType = apps.get_model('api', 'SimulationTopicType')
    SimulationTopic = apps.get_model('api', 'SimulationTopic')

    # Seed RoleTag
    for name in ROLE_TAGS:
        RoleTag.objects.get_or_create(name=name)

    # Seed SimulationTopicType and SimulationTopic
    for topic_type_name in SIMULATION_TOPICS:
        topic_type, _ = SimulationTopicType.objects.get_or_create(name=topic_type_name)
        for topic in SIMULATION_TOPICS[topic_type_name]:
            # Ensure topic exists and is associated with the correct type
            SimulationTopic.objects.update_or_create(
                name=topic,
                defaults={"type": topic_type},
            )


def unseed_data(apps, schema_editor):
    RoleTag = apps.get_model('api', 'RoleTag')
    SimulationTopicType = apps.get_model('api', 'SimulationTopicType')
    SimulationTopic = apps.get_model('api', 'SimulationTopic')

    for topics in SIMULATION_TOPICS.values():
        if topics:
            SimulationTopic.objects.filter(name__in=topics).delete()

    SimulationTopicType.objects.filter(name__in=list(SIMULATION_TOPICS.keys())).delete()

    if ROLE_TAGS:
        RoleTag.objects.filter(name__in=ROLE_TAGS).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_roletag_options_simulationtopictype_and_more'),
    ]

    operations = [
        migrations.RunPython(seed_data, reverse_code=unseed_data),
    ]
