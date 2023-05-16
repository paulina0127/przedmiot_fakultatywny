import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import {
  PatientProfileCreate,
  PatientProfileUpdate,
} from "../../components/patient";

const PatientScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const location = useLocation();
  const patient_id = useParams().id;

  return (
    <section className="up-section">
      {location.pathname.startsWith("/rejestracja") ? (
        <PatientProfileCreate user={user} />
      ) : (
        <PatientProfileUpdate
          user={user}
          patientExists={true}
          patientId={patient_id}
        />
      )}
    </section>
  );
};

export default PatientScreen;
