# Generated by Django 4.1.7 on 2023-05-12 13:50

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0009_alter_prescription_access_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='medicine',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(blank=True), default=list, size=None, verbose_name='Stosowane leki'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='symptoms',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(blank=True), default=list, size=None, verbose_name='Objawy'),
        ),
    ]
