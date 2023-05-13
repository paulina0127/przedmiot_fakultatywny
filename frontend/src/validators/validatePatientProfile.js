import { string, object, array, date } from 'yup';

const validatePatientProfile = object({
  first_name: string()
    .required('Pole imię jest obowiązkowe')
    .max(255, 'Imię może mieć maksymalnie 255 znaków.'),
  last_name: string()
    .required('Pole nazwisko jest obowiązkowe')
    .max(255, 'Nazwisko może mieć maksymalnie 255 znaków.'),
  pesel: string()
    .matches(/^[0-9]{11}$/, 'PESEL powinien składać się z 11 cyfr.')
    .required('Pole PESEL jest obowiązkowe'),
  birthdate: date()
    .max(
      new Date(),
      'Data urodzenia nie może być późniejsza niż teraźniejsza data'
    )
    .required('Data urodzenia jest wymagana'),
  email: string().email('To nie jest prawidłowy adres email'),
  phone_number: string().matches(
    /^\+\d{11}$/,
    'Numer telefonu musi być w formacie +XX XXXXXXXXX'
  ),
  street: string()
    .required('Pole ulica jest wymagane.')
    .matches(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-/]+$/,
      'Pole ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika.'
    )
    .max(255, 'Pole ulica może mieć maksymalnie 255 znaków.'),
  postal_code: string()
    .matches(/^\d{2}-\d{3}$/, 'Kod pocztowy powinien być w formacie XX-XXX.')
    .required('Kod pocztowy jest wymagany')
    .max(6, 'Kod pocztowy powinien być w formacie XX-XXX.'),
  city: string()
    .matches(
      /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
      'Miejscowość powinna składać się tylko z liter.'
    )
    .required('Miejscowość jest wymagana')
    .max(255, 'Pole miejscowość może mieć maksymalnie 255 znaków.'),
  medicine: array(),
  allergies: array(),
  diseases: array(),
});

export default validatePatientProfile;
