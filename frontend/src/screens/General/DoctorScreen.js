import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { DoctorRead } from "../../components/doctor";

const DoctorScreen = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const location = useLocation();
  const doctor_id = useParams().id;

  return (
    <section className="up-section">
      <DoctorRead doctorId={doctor_id} />
    </section>
  );
};

export default DoctorScreen;
