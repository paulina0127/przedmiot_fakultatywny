import { object, string, date } from "yup";


const validateAppointment = object({
  date: date()
    .min(
      new Date(),
      "Data wizyty nie może być wcześniejsza niż teraźniejsza data"
    )
    .required("Data wizyty jest wymagana"),
  time: string()
    .required("Wybierz slot czasowy"),
  doctor: string()
    .required("Wybierz lekarza"),
  patient: string()
    .required("Wybierz pacjenta"),
});

export default validateAppointment;
