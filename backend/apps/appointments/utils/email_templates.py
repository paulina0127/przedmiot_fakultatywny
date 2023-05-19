# Appointment email templates
from apps.appointments.utils.choices import AppointmentStatus


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
