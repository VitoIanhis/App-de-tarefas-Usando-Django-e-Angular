# Generated by Django 4.2.2 on 2023-06-21 00:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todo", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="task",
            name="status",
            field=models.BooleanField(default=False),
        ),
    ]
