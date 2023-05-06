from rest_framework import serializers

from ..models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"

    def validate(self, data):
        def correct_pesel_birthdate(pesel: str, birthdate) -> bool:
            rr, mm, dd = pesel[:2], pesel[2:4], pesel[4:6]
            correct_year, correct_month, correct_day = "", "", ""
            check_year, check_month, check_day = str(birthdate).split("-")  # RRRR-MM-DD
            if 1 <= int(mm) <= 12:
                correct_year = "19" + rr
                correct_month = mm
            elif 21 <= int(mm) <= 32:
                correct_year = "20" + rr
                correct_month = str(int(mm) - 20)
            elif 41 <= int(mm) <= 52:
                correct_year = "21" + rr
                correct_month = str(int(mm) - 40)
            elif 61 <= int(mm) <= 72:
                correct_year = "22" + rr
                correct_month = str(int(mm) - 60)
            if len(correct_month) == 1:
                correct_month = "0" + correct_month
            return correct_year == check_year and correct_month == check_month and dd == check_day

        if not correct_pesel_birthdate(data['pesel'], data['birthdate']):
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
        def correct_pesel(pesel) -> bool:
            if len(pesel) != 11:
                return False
            multiply = (1, 3, 7, 9, 1, 3, 7, 9, 1, 3)
            dig_sum, i = 0, 0
            for i, digit in enumerate(pesel[:-1]):
                dig_sum += int(digit) * multiply[i]
            dig_sum = 10 - int(str(dig_sum)[-1])
            if dig_sum == int(str(pesel)[-1]):
                return True
            return False

        if not correct_pesel(value):
            raise serializers.ValidationError("PESEL jest niepoprawny.")
        return value

    def validate_phone_number(self, value):
        if len(value) != 9:
            raise serializers.ValidationError("Numer telefonu musi mieć 9 cyfr.")
        if any(not char.isdigit() for char in str(value)):
            raise serializers.ValidationError("Telefon musi się składać tylko z cyfr.")
        return value

    def validate_city(self, value):
        if any(char.isdigit() for char in str(value)):
            raise serializers.ValidationError("Nazwa miejscowości nie może zawierać cyfr.")
        return value

    def validate_postal_code(self, value):
        if str(value).count('-') != 1:
            raise serializers.ValidationError("Kod pocztowy musi mieć jeden myślnik (-).")
        if any(not char.isdigit() or char != '-' for char in str(value)):
            raise serializers.ValidationError("Kod pocztowy może zawierać tylko cyfry i myślnik.")
        return value