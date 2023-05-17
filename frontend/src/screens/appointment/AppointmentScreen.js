import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import AppointmentForm from "../../components/appointment/AppointmentForm";

const AppointmentScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const location = useLocation();
  const doctor_id = useParams().id;

  return (
    <section className="up-section">
      {location.pathname.startsWith("/nowa") ? (
        <AppointmentForm doctorId={doctor_id} />
      ) : (
        <AppointmentForm />
      )}
    </section>
  );
};

export default AppointmentScreen;
