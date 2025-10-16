from django.db import migrations, models


TITLES_AND_SUMMARIES = [
    (
        "עימות עם פקוד על רקע אי-ציות",
        "המפקד מזמן את הפקוד לשיחה לאחר אירוע של אי-ציות בפקודה קריטית. השיחה בוחנת יכולת הובלה, אסרטיביות ושמירה על סמכות לצד הקשבה והבנה."
        " במהלך הסימולציה הנבחן נדרש להגדיר גבולות, להבהיר ציפיות, ולבנות תכנית תיקון תוך שמירה על יחסי אמון.",
    ),
    (
        "שיחה עם מפקד על כשלים בביצוע המשימה",
        "הנבחן נדרש להציג בפני רמה ממונה תחקיר קצר לאחר כשלים בביצוע משימה. תבחין מרכזי: לקיחת אחריות, כנות, מתן פתרונות מעשיים, והפקת לקחים."
        " הדגשים: תיעדוף כשלים, הבנת שורש הבעיה, ותכנית פעולה לשיפור לטווח קצר ובינוני.",
    ),
    (
        "רתימת צוות למשימה תחת לחץ זמן",
        "הנבחן מוביל צוות לא מנוסה למשימה דחופה עם חוסר וודאות. ההתנהלות הנדרשת: חלוקת תפקידים, תקשורת בהירה, והנעת הכוחות."
        " נמדדת היכולת לשמור על קור רוח, לזהות צווארי בקבוק, ולתת מענה לספקות והתנגדויות של הצוות.",
    ),
    (
        "התמודדות עם פנייה של הורה מודאג",
        "שיחה טלפונית עם הורה לפקוד המדווח על מצוקה. הנבחן נבחן ברגישות, מסגור נכון של גבולות המידע, והפניה לגורמים רלוונטיים."
        " הדגש הוא על שמירת פרטיות החייל, מענה אמפתי, והצגת תכנית פעולה סדורה.",
    ),
    (
        "בירור אמינות פקוד לאחר סתירות בדיווחים",
        "הנבחן מקיים שיחה עם פקוד שמסר גרסאות סותרות לגבי אירוע ביחידה. נבדקת היכולת לשאול שאלות פתוחות, לייצר אמון, ולפעול בשיקול דעת."
        " יש לצמצם הטיות, לשמור על כבוד הדדי, ולהוביל להבהרת תמונת מצב ולסיכום משותף.",
    ),
]


def seed_titles_and_summaries(apps, schema_editor):
    Simulation = apps.get_model("api", "Simulation")
    # Assign titles/summaries in a round-robin to existing simulations
    sims = list(Simulation.objects.all().order_by("id"))
    total_presets = len(TITLES_AND_SUMMARIES)
    for index, sim in enumerate(sims):
        title, summary = TITLES_AND_SUMMARIES[index % total_presets]
        if not sim.title:
            sim.title = title
        if not sim.summary:
            sim.summary = summary
        sim.save(update_fields=["title", "summary"])


def unseed_titles_and_summaries(apps, schema_editor):
    Simulation = apps.get_model("api", "Simulation")
    Simulation.objects.update(title="", summary="")


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0012_add_example_data"),
    ]

    operations = [
        migrations.AddField(
            model_name="simulation",
            name="title",
            field=models.CharField(default="", max_length=200, verbose_name="כותרת"),
        ),
        migrations.AddField(
            model_name="simulation",
            name="summary",
            field=models.TextField(blank=True, default="", verbose_name="תקציר"),
        ),
        migrations.RunPython(seed_titles_and_summaries, reverse_code=unseed_titles_and_summaries),
    ]


