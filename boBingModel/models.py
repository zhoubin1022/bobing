from django.db import models

# Create your models here.


class Player(models.Model):
    name = models.CharField(max_length=10)  # 昵称
    photo = models.ImageField(upload_to="photos", default="a.jpg")  # 头像
    level = models.SmallIntegerField(null=True)  # 最高奖项


class Record(models.Model):
    pid = models.SmallIntegerField()  # 本轮游戏id
    round = models.SmallIntegerField()  # 总轮数
    now_round = models.SmallIntegerField(default=0)  # 当前为第几轮
    playerNum = models.SmallIntegerField()  # 玩家人数
    nowLevel = models.SmallIntegerField(null=False)  # 本局游戏最高奖项
    uid = models.ForeignKey('Player', on_delete=models.CASCADE)  # 参与玩家id，必须在player中出现


class GameId(models.Model):
    round = models.SmallIntegerField()  # 总轮数
    playerNum = models.SmallIntegerField()  # 玩家人数
