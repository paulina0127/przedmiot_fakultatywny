import { object, ref, string } from "yup";

const validateChangeEmail = object({
  current_password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1 wielką literę")
    .required("Aktualne hasło jest obowiązkowe"),
  new_email: string()
    .email("To nie jest prawidłowy adres email")
    .required("Nowe adres e-mail jest obowiązkowy"),
  re_new_email: string()
    .oneOf(
      [ref("new_email"), null],
      "Wprowadzone adresy e-mail różnią się od siebie."
    )
    .email("To nie jest prawidłowy adres email")
    .required("Powtórz adres e-mail"),
});

export default validateChangeEmail;
