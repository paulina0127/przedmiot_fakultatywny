# Generated by Django 4.1.7 on 2023-05-05 21:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0005_prescription_dosage_alter_appointment_doctor_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prescription',
            name='dosage',
        ),
    ]
