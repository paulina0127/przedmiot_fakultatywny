import { validatePatientProfile } from '../../validators/validatePatientProfile';
import PatientForm from './PatientForn/PatientForm';
import { Message, Loader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from '../../actions/userActions';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';

export const PatientProfileCreate = () => {
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
    medicine: [''],
    allergies: [''],
    diseases: [''],
    image: null,
  };

  return (
    <PatientForm
      initialValues={initialValues}
      validate={validatePatientProfile}
      label='Zarejestruj'
    />
  );
};

export const PatientProfileUpdate = ({ userProfile }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(userProfile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, []);

  const profile = useSelector((state) => state.userProfileDetails);
  const { error, loading, user } = profile;

  const initialValues = user
    ? {
        first_name: user.first_name,
        last_name: user.last_name,
        pesel: user.pesel,
        birthdate: user.birthdate,
        email: user.email,
        phone_number: user.phone_number,
        street: user.street,
        postal_code: user.postal_code,
        city: user.city,
        medicine: user.medicine,
        allergies: user.allergies,
        diseases: user.diseases,
        image: user.image,
      }
    : {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : user && Object.keys(user).length === 0 ? null : (
        <PatientForm
          profileExist={true}
          userProfile={userProfile}
          initialValues={initialValues}
          validate={validatePatientProfile}
          label='Zapisz zmiany'
        />
      )}
    </>
  );
};
