import { useSelector } from "react-redux";

import {
  PatientProfileCreate,
  PatientProfileUpdate,
} from "../../components/patient";

const PatientProfileScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <section className="up-section">
      {user?.type === "Nowy użytkownik" || user?.profile == null ? (
        <PatientProfileCreate user={user} />
      ) : (
        <>
          <PatientProfileUpdate
            user={user}
            patientExists={true}
            patientId={user?.profile?.id}
          />
        </>
      )}
    </section>
  );
};

export default PatientProfileScreen;
