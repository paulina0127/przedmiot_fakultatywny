import { object, string } from "yup";

const validateLogin = object({
  email: string()
    .email("To nie jest prawidłowy adres email")
    .required("Pole adres email jest obowiązkowe"),
  password: string().required("Hasło jest obowiązkowe"),
});

export default validateLogin;
