# Generated by Django 3.2.7 on 2021-10-08 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boBingModel', '0004_record_now_round'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameId',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round', models.SmallIntegerField()),
                ('playerNum', models.SmallIntegerField()),
            ],
        ),
    ]
