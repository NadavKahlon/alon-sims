from django.db import models


class SimulationType(models.TextChoices):
    """The type of the simulation."""

    FORMAL = "פורמלית", "פורמלית"
    UNANNOUNCED = "מתפרצת", "מתפרצת"


class SimulationDifficulty(models.TextChoices):
    """The difficulty of the simulation."""

    EASY = "קלה", "קלה"
    MEDIUM = "בינונית", "בינונית"
    HARD = "קשה", "קשה"


class RoleTag(models.Model):
    """A tag associated with the role of the simulated student."""

    name = models.CharField("שם", max_length=80, unique=True)

    class Meta:
        verbose_name = "תגית תפקיד"
        verbose_name_plural = "תגיות תפקידים"
        indexes = [models.Index(fields=["name"])]

    def __str__(self):
        return self.name


class SimulationTopicType(models.Model):
    """A classification for topic tags."""

    name = models.CharField("סוג", max_length=80, unique=True)
    color = models.CharField("צבע", max_length=20, default="#9e9e9e")
    serial_num = models.IntegerField("מספר סודר", default=0)

    class Meta:
        verbose_name = "סוג נושא סימולציה"
        verbose_name_plural = "סוגי נושאי סימולציות"
        indexes = [models.Index(fields=["name"])]

    def __str__(self):
        return self.name


class SimulationTopic(models.Model):
    """A tag associated with the topic of the simulation."""

    name = models.CharField("נושא", max_length=80, unique=True)
    type = models.ForeignKey(
        SimulationTopicType,
        on_delete=models.PROTECT,
        related_name="topic_tags",
        verbose_name="סוג",
        null=True,
        blank=True,
    )

    class Meta:
        verbose_name = "נושא סימולציה"
        verbose_name_plural = " נושאי סימולציות"
        indexes = [models.Index(fields=["name"])]

    def __str__(self):
        return self.name


class WeekTopic(models.Model):
    """The topic of a week in officers' training."""

    topic = models.CharField("נושא", max_length=80, unique=True)
    serial_num = models.IntegerField("מספר סודר")

    class Meta:
        verbose_name = "נושא שבועי"
        verbose_name_plural = "נושאים שבועיים"
        indexes = [models.Index(fields=["topic"])]

    def __str__(self):
        return self.topic


class Simulation(models.Model):
    """A simulation."""

    title = models.CharField("כותרת", max_length=200, default="")
    summary = models.TextField("תקציר", blank=True, default="")
    author = models.CharField("מחבר", max_length=100, default="מחבר לא ידוע")
    url = models.URLField(verbose_name="קישור")
    week_topic = models.ForeignKey(
        "WeekTopic",
        on_delete=models.PROTECT,
        related_name="simulations",
        verbose_name="נושא שבועי",
    )
    type = models.CharField(
        max_length=20,
        choices=SimulationType.choices,
        verbose_name="סוג",
    )
    difficulty = models.CharField(
        max_length=10,
        choices=SimulationDifficulty.choices,
        verbose_name="רמת קושי",
    )
    role = models.ForeignKey(
        RoleTag,
        on_delete=models.PROTECT,
        related_name="simulations",
        verbose_name="תפקיד",
        null=True,
        blank=True,
    )
    simulation_topics = models.ManyToManyField(
        SimulationTopic,
        related_name="simulations",
        verbose_name="נושאי סימולציה",
        blank=True,
    )

    class Meta:
        verbose_name = "סימולציה"
        verbose_name_plural = "סימולציות"
        indexes = [
            models.Index(fields=["type"]),
            models.Index(fields=["difficulty"]),
            models.Index(fields=["author"]),
        ]

    def __str__(self):
        if self.title:
            return self.title
        role = self.role if self.role is not None else "כללי"
        return f"{self.author} - {role}"
