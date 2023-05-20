import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import {
  AppointmentCreate,
  AppointmentCreateForPatient,
} from "../../components/appointment/AppointmentCRUD";

const AppointmentScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  return (
    <section className="up-section">
      {user?.type === "Pacjent" ? (
        <AppointmentCreateForPatient user={user} />
      ) : (
        <AppointmentCreate user={user} />
      )}
    </section>
  );
};

export default AppointmentScreen;
