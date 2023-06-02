# Generated by Django 4.1.7 on 2023-05-23 18:19

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0012_alter_appointment_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='prescription',
            name='expires_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 22, 18, 19, 19, 254099, tzinfo=datetime.timezone.utc), verbose_name='Wygasa'),
        ),
        migrations.AddField(
            model_name='prescription',
            name='status',
            field=models.CharField(choices=[('Zatwierdzona', 'Zatwierdzona'), ('Zrealizowana', 'Zrealizowana'), ('Anulowana', 'Anulowana')], default='Zatwierdzona', max_length=50, verbose_name='Status'),
        ),
    ]