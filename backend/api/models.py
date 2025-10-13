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

    class Meta:
        verbose_name = "נושא שבועי"
        verbose_name_plural = "נושאים שבועיים"
        indexes = [models.Index(fields=["topic"])]

    def __str__(self):
        return self.topic


class Simulation(models.Model):
    """A simulation."""
    url = models.URLField(verbose_name="קישור")
    main_sim_topic = models.ForeignKey(
        SimulationTopic,
        on_delete=models.PROTECT,
        related_name="main_topic_simulations",
        verbose_name="נושא מרכזי",
    )
    main_role_tag = models.ForeignKey(
        RoleTag,
        on_delete=models.PROTECT,
        related_name="main_role_tag_simulations",
        verbose_name="תגית תפקיד מרכזית",
    )
    type = models.CharField(
        max_length=20,
        choices=SimulationType.choices,
        verbose_name="סוג",
    )
    main_week = models.ForeignKey(
        "WeekTopic",
        on_delete=models.PROTECT,
        related_name="main_week_simulations",
        verbose_name="שבוע מרכזי",
    )
    difficulty = models.CharField(
        max_length=10,
        choices=SimulationDifficulty.choices,
        verbose_name="רמת קושי",
    )
    additional_sim_topics = models.ManyToManyField(
        SimulationTopic,
        related_name="additional_topic_simulations",
        verbose_name="נושאים נוספים",
        blank=True,
    )
    additional_role_tags = models.ManyToManyField(
        RoleTag,
        related_name="additional_role_tag_simulations",
        verbose_name="תגיות תפקיד נוספות",
        blank=True,
    )
    additional_weeks = models.ManyToManyField(
        "WeekTopic",
        related_name="additional_week_simulations",
        verbose_name="שבועות אפשריים נוספים",
        blank=True,
    )

    class Meta:
        verbose_name = "סימולציה"
        verbose_name_plural = "סימולציות"
        indexes = [
            models.Index(fields=["type"]),
            models.Index(fields=["difficulty"]),
        ]

    def __str__(self):
        return f"{self.main_sim_topic} - {self.main_role_tag}"
