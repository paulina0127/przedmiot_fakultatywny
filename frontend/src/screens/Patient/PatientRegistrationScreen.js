import { PatientForm } from '../../components';
import SignUpScreen from '../Auth/SignUpScreen';
import { useState, useEffect } from 'react';
import { validatePatientProfile } from '../../validators';

const PatientRegistrationScreen = () => {
  const [isAccountData, setIsAccountData] = useState(false);
  const [accountData, setAccountData] = useState({
    email: '',
    password: '',
    re_password: '',
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    pesel: '',
    birthdate: new Date(),
    email: '',
    phone_number: '',
    street: '',
    postal_code: '',
    city: '',
    medicine: [],
    allergies: [],
    diseases: [],
    image: null,
  };

  const handleAccountSubmit = (data) => {
    setAccountData(data);
    setIsAccountData(true);
  };

  const handleGoBack = () => {
    setIsAccountData(false);
  };

  // Re-render when account data exists
  useEffect(() => {}, [isAccountData]);

  return (
    <>
      {!isAccountData && (
        <SignUpScreen
          initialValues={accountData}
          onSubmit={handleAccountSubmit}
        />
      )}
      {isAccountData && (
        <section className='up-section'>
          <PatientForm
            initialValues={initialValues}
            validate={validatePatientProfile}
            label='Zarejestruj'
            accountData={accountData}
            goBack={handleGoBack}
          />
        </section>
      )}
    </>
  );
};

export default PatientRegistrationScreen;
