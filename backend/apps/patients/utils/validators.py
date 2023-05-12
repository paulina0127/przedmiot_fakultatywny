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
