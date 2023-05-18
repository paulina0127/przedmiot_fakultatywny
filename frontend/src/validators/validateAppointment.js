import { object, string } from "yup";

const validateAppointment = object({
  pesel: string().required("Pole adres email jest obowiązkowe"),
});

export default validateAppointment;
