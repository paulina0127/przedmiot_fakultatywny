import { array, date, object, string, ref } from "yup";

const validatePatient = object({
  first_name: string()
    .required("Pole imię jest obowiązkowe")
    .max(255, "Imię może mieć maksymalnie 255 znaków."),
  last_name: string()
    .required("Pole nazwisko jest obowiązkowe")
    .max(255, "Nazwisko może mieć maksymalnie 255 znaków."),
  pesel: string()
  .matches(/^[0-9]{11}$/, "PESEL powinien składać się z 11 cyfr.")
  .required("Pole PESEL jest obowiązkowe")
  .test('birthdate', 'Nieprawidłowa data urodzenia w numerze PESEL', function(value) {
    const pesel = value || '';
    const rr = pesel.slice(0, 2);
    const mm = pesel.slice(2, 4);
    const dd = pesel.slice(4, 6);
    
    const checkDate = this.resolve(ref('birthdate'));
    const checkYear = checkDate.getFullYear().toString();
    const checkMonth = (checkDate.getMonth() + 1).toString().padStart(2, '0');
    const checkDay = checkDate.getDate().toString().padStart(2, '0');
    
    let correctYear = '';
    let correctMonth = '';
    
    switch (true) {
      case (1 <= parseInt(mm) && parseInt(mm) <= 12):
        correctYear = '19' + rr;
        correctMonth = mm;
        break;
      case (21 <= parseInt(mm) && parseInt(mm) <= 32):
        correctYear = '20' + rr;
        correctMonth = (parseInt(mm) - 20).toString();
        break;
      case (41 <= parseInt(mm) && parseInt(mm) <= 52):
        correctYear = '21' + rr;
        correctMonth = (parseInt(mm) - 40).toString();
        break;
      case (61 <= parseInt(mm) && parseInt(mm) <= 72):
        correctYear = '22' + rr;
        correctMonth = (parseInt(mm) - 60).toString();
        break;
    }
    
    if (correctMonth.length === 1) {
      correctMonth = '0' + correctMonth;
    }
    
    return correctYear === checkYear && correctMonth === checkMonth && dd === checkDay;
  }),
  birthdate: date()
    .max(
      new Date(),
      "Data urodzenia nie może być późniejsza niż teraźniejsza data"
    )
    .required("Data urodzenia jest wymagana"),
  email: string().email("To nie jest prawidłowy adres email"),
  phone_number: string().matches(
    /^\+\d{11}$/,
    "Numer telefonu musi być w formacie +XX XXXXXXXXX"
  ),
  street: string()
    .required("Pole ulica jest wymagane.")
    .matches(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-/]+$/,
      "Pole ulica może składać się tylko z liter, cyfr, spacji, myślnika i ukośnika."
    )
    .max(255, "Pole ulica może mieć maksymalnie 255 znaków."),
  postal_code: string()
    .matches(/^\d{2}-\d{3}$/, "Kod pocztowy powinien być w formacie XX-XXX.")
    .required("Kod pocztowy jest wymagany")
    .max(6, "Kod pocztowy powinien być w formacie XX-XXX."),
  city: string()
    .matches(
      /^[A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]*$/,
      "Miejscowość powinna składać się tylko z liter."
    )
    .required("Miejscowość jest wymagana")
    .max(255, "Pole miejscowość może mieć maksymalnie 255 znaków."),
  medicine: array(),
  allergies: array(),
  diseases: array(),
});

export default validatePatient;
