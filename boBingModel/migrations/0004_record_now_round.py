# Generated by Django 3.2.7 on 2021-10-07 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boBingModel', '0003_alter_player_photo'),
    ]

    operations = [
        migrations.AddField(
            model_name='record',
            name='now_round',
            field=models.SmallIntegerField(default=0),
        ),
    ]