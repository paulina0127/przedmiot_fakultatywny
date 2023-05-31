import { object, ref, string } from "yup";

const validateChangePassword = object({
  current_password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1 wielką literę")
    .required("Aktualne hasło jest obowiązkowe"),
  new_password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1. cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1. wielką literę ")
    .required("Nowe hasło jest obowiązkowe"),
  re_new_password: string()
    .oneOf(
      [ref("new_password"), null],
      "Wprowadzone hasła różnią się od siebie."
    )
    .required("Powtórz wprowadzone hasło"),
});

export default validateChangePassword;
