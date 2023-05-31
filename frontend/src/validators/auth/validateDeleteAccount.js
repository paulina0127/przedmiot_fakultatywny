import { object, string } from "yup";

const validateDeleteAccount = object({
  current_password: string()
    .min(8, "Hasło musi zawierać co najmniej 8 znaków")
    .matches(/[0-9]/, "Hasło musi zawierać co najmniej 1 cyfrę")
    .matches(/[A-Z]/, "Hasło musi zawierać co najmniej 1 wielką literę")
    .required("Aktualne hasło jest obowiązkowe"),
});

export default validateDeleteAccount;
