from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=10)
    photo = models.ImageField(upload_to="photos", default="a.jpg")
    level = models.SmallIntegerField(null=True)


class Record(models.Model):
    pid = models.SmallIntegerField()
    round = models.SmallIntegerField()
    playerNum = models.SmallIntegerField()
    nowLevel = models.SmallIntegerField()
    uid = models.ForeignKey('Player', on_delete=models.CASCADE)
