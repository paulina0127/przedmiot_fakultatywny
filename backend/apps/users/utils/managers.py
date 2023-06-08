from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import Group

from .choices import UserType


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, type=None, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        if type is not None:
            user = self.model(email=email, type=type, **extra_fields)
        else:
            user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, type=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        if type is not None:
            return self._create_user(email, password, type, **extra_fields)
        else:
            return self._create_user(email, password, **extra_fields)

    def _create_superuser(self, email, password, type=UserType.ADMIN, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, type=UserType.ADMIN, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_superuser(email, password, **extra_fields)
