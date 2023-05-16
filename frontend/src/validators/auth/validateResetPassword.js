import { object, string } from "yup";

const validateResetPassword = object({
  email: string()
    .email("To nie jest prawidłowy adres email")
    .required("Pole adres email jest obowiązkowe"),
});

export default validateResetPassword;
