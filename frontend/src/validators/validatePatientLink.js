import { object, string } from "yup";

const validatePatientLink = object({
  pesel: string().required("Pole adres email jest obowiązkowe"),
  link_key: string().required("Pole klucz łączenia profilu jest obowiązkowe"),
});

export default validatePatientLink;
