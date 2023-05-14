# Generated by Django 4.1.7 on 2023-05-08 14:34

import django_better_admin_arrayfield.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0007_alter_appointment_recommendations'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='medicine',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(), blank=True, size=None, verbose_name='Stosowane leki'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='symptoms',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(), blank=True, size=None, verbose_name='Objawy'),
        ),
    ]