from djoser.serializers import UserCreatePasswordRetypeSerializer, PasswordRetypeSerializer
from rest_framework import serializers

from ..models import Patient
from ..utils.validators import correct_pesel_birthdate, correct_pesel
from ...users.models import User
from ...users.utils.choices import UserType


class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    link_key = serializers.CharField(read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"

    # def validate(self, data):
    #     if not correct_pesel_birthdate(data['pesel'], data['birthdate']):
    #         raise serializers.ValidationError("PESEL nie zgadza się z datą urodzenia.")
    #     return data

    def validate_first_name(self, value):
        if any(char.isdigit() for char in value):
            raise serializers.ValidationError("Imię nie może zawierać cyfr.")
        return value.title()

    def validate_last_name(self, value):
        if any(char.isdigit() for char in value):
            raise serializers.ValidationError("Nazwisko nie może zawierać cyfr.")
        return value.title()

    def validate_pesel(self, value):
        if not correct_pesel(value):
            raise serializers.ValidationError("PESEL jest niepoprawny.")
        return value

    def validate_city(self, value):
        if any(char.isdigit() for char in str(value)):
            raise serializers.ValidationError("Nazwa miejscowości nie może zawierać cyfr.")
        return value

    def validate_postal_code(self, value):
        if str(value).count('-') != 1:
            raise serializers.ValidationError("Kod pocztowy musi mieć jeden myślnik (-).")
        if not all(char.isdigit() or char == '-' for char in str(value)):
            raise serializers.ValidationError("Kod pocztowy może zawierać tylko cyfry i myślnik.")
        return value


class PatientUserCreateSerializer(serializers.ModelSerializer):
    # Serializer for creating new user and patient profile
    user = UserCreatePasswordRetypeSerializer(required=True)

    class Meta:
        model = Patient
        exclude = ('link_key',)

    def create(self, validated_data):
        # Extract user data from validated data
        user_data = validated_data.pop('user')
        user_data['type'] = UserType.PATIENT

        # Create patient
        patient = Patient.objects.create(**validated_data)
        # Create user
        user = User.objects.create_user(**user_data)
        # Assign new user to patient and save
        patient.user = user
        patient.save()
        return patient


class CreateUserLinkPatientSerializer(UserCreatePasswordRetypeSerializer, PatientSerializer):
    pesel = serializers.CharField(max_length=11, write_only=True)
    link_key = serializers.CharField(max_length=100, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'pesel', 'link_key', 'email', 'password')

    def validate(self, data):
        # Remove fields from request data and use for filtering
        try:
            patient = Patient.objects.get(user=None, pesel=data.pop('pesel'), link_key=data.pop('link_key'))
        except Patient.DoesNotExist:
            raise serializers.ValidationError("Podano błędne dane lub użytkownik "
                                              "jest już przypisany do pacjenta.")
        super().validate(data)
        data['patient'] = patient  # add [temporary] patient field in request data
        return data

    def create(self, validated_data):
        patient = validated_data.pop('patient')  # remove patient field from request data
        validated_data['type'] = UserType.PATIENT
        user = super().create(validated_data)

        # Update patient
        patient.user = user
        patient.link_key = ''  # reset one-time code
        patient.save()

        return user
