from rest_framework import serializers

from ..models import Patient
from ..utils.validators import correct_pesel_birthdate, correct_pesel


class PatientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    link_key = serializers.CharField(read_only=True)

    class Meta:
        model = Patient
        fields = "__all__"

    def validate(self, data):
        if self.instance:
            pesel = data.get("pesel", self.instance.pesel)
            birthdate = data.get("birthdate", self.instance.birthdate)
        else:
            pesel = data.get("pesel")
            birthdate = data.get("birthdate")
        if not correct_pesel_birthdate(pesel, birthdate):
            raise serializers.ValidationError("PESEL nie zgadza się z datą urodzenia.")
        return data

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
            raise serializers.ValidationError(
                "Nazwa miejscowości nie może zawierać cyfr."
            )
        return value

    def validate_postal_code(self, value):
        if str(value).count("-") != 1:
            raise serializers.ValidationError(
                "Kod pocztowy musi mieć jeden myślnik (-)."
            )
        if not all(char.isdigit() or char == "-" for char in str(value)):
            raise serializers.ValidationError(
                "Kod pocztowy może zawierać tylko cyfry i myślnik."
            )
        return value


class UserLinkPatientSerializer(serializers.Serializer):
    pesel = serializers.CharField(max_length=11, write_only=True)
    link_key = serializers.CharField(max_length=100, write_only=True)

    def validate_pesel(self, value):
        if not correct_pesel(value):
            raise serializers.ValidationError("Niepoprawny PESEL.")
        return value
