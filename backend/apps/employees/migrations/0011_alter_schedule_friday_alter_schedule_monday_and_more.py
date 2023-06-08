# Generated by Django 4.1.7 on 2023-05-12 13:50

import apps.employees.utils.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0010_alter_schedule_friday_alter_schedule_monday_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schedule',
            name='friday',
            field=apps.employees.utils.fields.ChoiceArrayField(base_field=models.CharField(choices=[('09:00', '9:00'), ('09:30', '9:30'), ('10:00', '10:00'), ('10:30', '10:30'), ('11:00', '11:00'), ('11:30', '11:30'), ('12:00', '12:00'), ('12:30', '12:30'), ('13:00', '13:00'), ('14:00', '14:00'), ('14:30', '14:30'), ('15:00', '15:00'), ('15:30', '15:30'), ('16:00', '16:00'), ('16:30', '16:30')], max_length=5), default=list, size=None, verbose_name='Piątek'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='monday',
            field=apps.employees.utils.fields.ChoiceArrayField(base_field=models.CharField(choices=[('09:00', '9:00'), ('09:30', '9:30'), ('10:00', '10:00'), ('10:30', '10:30'), ('11:00', '11:00'), ('11:30', '11:30'), ('12:00', '12:00'), ('12:30', '12:30'), ('13:00', '13:00'), ('14:00', '14:00'), ('14:30', '14:30'), ('15:00', '15:00'), ('15:30', '15:30'), ('16:00', '16:00'), ('16:30', '16:30')], max_length=5), default=list, size=None, verbose_name='Poniedziałek'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='thursday',
            field=apps.employees.utils.fields.ChoiceArrayField(base_field=models.CharField(choices=[('09:00', '9:00'), ('09:30', '9:30'), ('10:00', '10:00'), ('10:30', '10:30'), ('11:00', '11:00'), ('11:30', '11:30'), ('12:00', '12:00'), ('12:30', '12:30'), ('13:00', '13:00'), ('14:00', '14:00'), ('14:30', '14:30'), ('15:00', '15:00'), ('15:30', '15:30'), ('16:00', '16:00'), ('16:30', '16:30')], max_length=5), default=list, size=None, verbose_name='Czwartek'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='tuesday',
            field=apps.employees.utils.fields.ChoiceArrayField(base_field=models.CharField(choices=[('09:00', '9:00'), ('09:30', '9:30'), ('10:00', '10:00'), ('10:30', '10:30'), ('11:00', '11:00'), ('11:30', '11:30'), ('12:00', '12:00'), ('12:30', '12:30'), ('13:00', '13:00'), ('14:00', '14:00'), ('14:30', '14:30'), ('15:00', '15:00'), ('15:30', '15:30'), ('16:00', '16:00'), ('16:30', '16:30')], max_length=5), default=list, size=None, verbose_name='Wtorek'),
        ),
        migrations.AlterField(
            model_name='schedule',
            name='wednesday',
            field=apps.employees.utils.fields.ChoiceArrayField(base_field=models.CharField(choices=[('09:00', '9:00'), ('09:30', '9:30'), ('10:00', '10:00'), ('10:30', '10:30'), ('11:00', '11:00'), ('11:30', '11:30'), ('12:00', '12:00'), ('12:30', '12:30'), ('13:00', '13:00'), ('14:00', '14:00'), ('14:30', '14:30'), ('15:00', '15:00'), ('15:30', '15:30'), ('16:00', '16:00'), ('16:30', '16:30')], max_length=5), default=list, size=None, verbose_name='Środa'),
        ),
    ]
