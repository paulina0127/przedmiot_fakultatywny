# Generated by Django 4.1.7 on 2023-05-08 13:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0005_alter_patient_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='image',
            field=models.ImageField(blank=True, upload_to='patients/', verbose_name='Zdjęcie'),
        ),
    ]
