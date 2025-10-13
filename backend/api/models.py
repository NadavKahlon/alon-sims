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
