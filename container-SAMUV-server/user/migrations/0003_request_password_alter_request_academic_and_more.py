# Generated by Django 5.0.3 on 2024-09-19 16:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_request_academic_alter_request_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='password',
            field=models.CharField(default=''),
        ),
        migrations.AlterField(
            model_name='request',
            name='academic',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user.academic'),
        ),
        migrations.AlterField(
            model_name='request',
            name='status',
            field=models.CharField(choices=[('pendiente', 'pendiente'), ('aprobada', 'Aprobada'), ('rechazada', 'Rechazada'), ('utilizada', 'Utilizada')], default='pendiente', max_length=20),
        ),
    ]
