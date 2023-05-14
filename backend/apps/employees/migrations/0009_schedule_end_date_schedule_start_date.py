# Generated by Django 4.1.7 on 2023-05-08 14:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0008_remove_schedule_end_date_remove_schedule_start_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='schedule',
            name='end_date',
            field=models.DateField(blank=True, editable=False, null=True, verbose_name='Koniec tygodnia'),
        ),
        migrations.AddField(
            model_name='schedule',
            name='start_date',
            field=models.DateField(blank=True, null=True, verbose_name='Początek tygodnia'),
        ),
    ]