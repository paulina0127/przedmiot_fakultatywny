# Generated by Django 4.1.7 on 2023-05-08 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0006_remove_prescription_dosage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='recommendations',
            field=models.TextField(blank=True, verbose_name='Zalecenia'),
        ),
    ]
