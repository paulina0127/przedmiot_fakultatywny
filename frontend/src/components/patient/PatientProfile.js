import { validatePatientProfile } from '../../validators';
import { PatientForm } from '../patient';
import { Message, Loader } from '../general';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserDetails } from '../../actions/userActions';
import { USER_DETAILS_PROFILE_RESET } from '../../constants/userConst';

export const PatientProfileCreate = ({ user }) => {
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

  return (
    <PatientForm
      user={user}
      initialValues={initialValues}
      validate={validatePatientProfile}
      label='Zapisz'
    />
  );
};

export const PatientProfileUpdate = ({ user, userProfile }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(userProfile));
    return () => {
      dispatch({ type: USER_DETAILS_PROFILE_RESET });
    };
  }, []);

  const profileDetails = useSelector((state) => state.userProfileDetails);
  const { error, loading, profile } = profileDetails;

  const initialValues = profile
    ? {
        first_name: profile.first_name,
        last_name: profile.last_name,
        pesel: profile.pesel,
        birthdate: profile.birthdate,
        email: profile.email,
        phone_number: profile.phone_number,
        street: profile.street,
        postal_code: profile.postal_code,
        city: profile.city,
        medicine: profile.medicine,
        allergies: profile.allergies,
        diseases: profile.diseases,
        image: profile.image,
      }
    : {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : profile && Object.keys(profile).count === 0 ? null : (
        <PatientForm
          profileExist={true}
          userProfile={userProfile}
          user={user}
          initialValues={initialValues}
          validate={validatePatientProfile}
          label='Zapisz zmiany'
        />
      )}
    </>
  );
};
