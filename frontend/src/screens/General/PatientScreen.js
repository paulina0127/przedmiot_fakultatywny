import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { PatientCreate, PatientUpdate } from "../../components/patient";

const PatientScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const location = useLocation();
  const patient_id = useParams().id;

  return (
    <section className="up-section">
      {user?.type === "Nowy użytkownik" ||
      (user?.type == "Recepcjonista" &&
        location.pathname.startsWith("/rejestracja")) ? (
        <PatientCreate user={user} />
      ) : (
        <PatientUpdate
          user={user}
          patientExists={true}
          patientId={user?.type == "Pacjent" ? user?.profile?.id : patient_id}
        />
      )}
    </section>
  );
};

export default PatientScreen;
