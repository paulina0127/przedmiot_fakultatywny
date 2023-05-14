import { useSelector } from 'react-redux';
import {
  PatientProfileCreate,
  PatientProfileUpdate,
} from '../../components/patient/PatientProfile';

const PatientProfileScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <section className='up-section'>
      {user?.type === 'Nowy użytkownik' || user?.profile == null ? (
        <PatientProfileCreate />
      ) : (
        <>
          <PatientProfileUpdate userProfile={user?.profile?.id} />
        </>
      )}
    </section>
  );
};

export default PatientProfileScreen;
