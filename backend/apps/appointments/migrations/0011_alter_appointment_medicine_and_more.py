# Generated by Django 4.1.7 on 2023-05-13 19:52

from django.db import migrations, models
import django_better_admin_arrayfield.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0010_alter_appointment_medicine_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='medicine',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(blank=True), blank=True, default=list, size=None, verbose_name='Stosowane leki'),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='symptoms',
            field=django_better_admin_arrayfield.models.fields.ArrayField(base_field=models.TextField(blank=True), blank=True, default=list, size=None, verbose_name='Objawy'),
        ),
        migrations.AlterField(
            model_name='prescription',
            name='access_code',
            field=models.CharField(max_length=4, verbose_name='Kod dostępu'),
        ),
    ]
