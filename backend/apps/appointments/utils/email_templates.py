# Appointment email templates
from apps.appointments.utils.choices import AppointmentStatus, PrescriptionStatus

APPOINTMENT_TO_BE_CONFIRMED = {"subject": "Wizyta czeka na potwierdzenie",
                               "body": "Twoja wizyta w Healthy Care czeka na potwierdzenie przez pracownika. "
                                       "Otrzymasz oddzielną wiadomość o aktualizacji statusu. "
                                       "Możesz sprawdzić aktualny status lub anulować wizytę na naszej stronie.\n"}

APPOINTMENT_CONFIRMED = {"subject": "Twoja wizyta jest potwierdzona",
                         "body": "Twoja wizyta w Healthy Care została potwierdzona. "
                                 "Zapraszamy na umówiony termin. "
                                 "Możesz sprawdzić aktualny status lub anulować wizytę na naszej stronie.\n"}

APPOINTMENT_CANCELLED = {"subject": "Anulowana wizyta",
                         "body": "Twoja wizyta w Healthy Care została anulowana. "
                                 "Zapraszamy w innym terminie.\n"}

APPOINTMENT_COMPLETED = {"subject": "Twoja wizyta",
                         "body": "Twoja wizyta w Healthy Care została zakończona. "
                                 "Informacje o wizycie znajdziesz na naszej stronie po zalogowaniu się. "
                                 "Zapraszamy ponownie.\n"}


def appointment_email_template(status) -> None | dict[str, str]:
    if not status:
        raise ValueError("Argument status: AppointmentStatus jest wymagany")
    if status == AppointmentStatus.TO_BE_CONFIRMED:
        return APPOINTMENT_TO_BE_CONFIRMED
    elif status == AppointmentStatus.CONFIRMED:
        return APPOINTMENT_CONFIRMED
    elif status == AppointmentStatus.COMPLETED:
        return APPOINTMENT_COMPLETED
    elif status == AppointmentStatus.CANCELLED:
        return APPOINTMENT_CANCELLED


PRESCRIPTION_ADDED = {"subject": "Twoja recepta",
                      "body": "Lekarz z Healthy Care wydał dla Ciebie receptę. "
                              "Szczegółowe informacje o niej znajdziesz na naszej stronie po zalogowaniu się.\n"}

PRESCRIPTION_CANCELLED = {"subject": "Twoja recepta została anulowana",
                          "body": "Lekarz z Healthy Care anulował Twoją receptę. "
                                  "Skontaktuj się z lekarzem w razie pytań.\n"}


def prescription_email_template(status) -> None | dict[str, str]:
    if not status:
        raise ValueError("Argument status: PrescriptionStatus jest wymagany")
    if status == PrescriptionStatus.CONFIRMED:
        return PRESCRIPTION_ADDED
    elif status == AppointmentStatus.CANCELLED:
        return PRESCRIPTION_CANCELLED
    else:
        return None
