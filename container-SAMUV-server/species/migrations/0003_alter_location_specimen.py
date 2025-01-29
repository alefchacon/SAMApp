# Generated by Django 4.2.6 on 2023-10-19 23:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('species', '0002_alter_contributorrole_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='specimen',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='specimen', to='species.specimen'),
        ),
    ]
