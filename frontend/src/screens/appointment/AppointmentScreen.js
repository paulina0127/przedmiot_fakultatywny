import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  AppointmentCreate,
  AppointmentCreateForPatient,
  AppointmentUpdate,
} from "../../components/appointment/AppointmentCRUD";

const AppointmentScreen = ({ type }) => {
  const { user } = useSelector((state) => state.auth);
  const appointment_id = useParams().id;

  return (
    <section className="up-section">
      {type === "create" ? (
        user?.type === "Pacjent" ? (
          <AppointmentCreateForPatient user={user} />
        ) : (
          <AppointmentCreate user={user} />
        )
      ) : type === "update" ? (
        <AppointmentUpdate user={user} appointmentId={appointment_id} />
      ) : null}
    </section>
  );
};

export default AppointmentScreen;
