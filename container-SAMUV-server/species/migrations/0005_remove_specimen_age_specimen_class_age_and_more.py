# Generated by Django 5.0.2 on 2024-02-21 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('species', '0004_alter_specie_scientific_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='specimen',
            name='age',
        ),
        migrations.AddField(
            model_name='specimen',
            name='class_age',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='specimen',
            name='preparation_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
