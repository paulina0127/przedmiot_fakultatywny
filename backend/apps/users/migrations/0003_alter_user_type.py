# Generated by Django 4.1.7 on 2023-05-13 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_email_alter_user_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.CharField(choices=[('Nowy user', 'Nowy user'), ('Pacjent', 'Pacjent'), ('Lekarz', 'Lekarz'), ('Recepcjonista', 'Recepcjonista'), ('Admin', 'Admin')], default='Pacjent', max_length=50, verbose_name='Rodzaj'),
        ),
    ]
