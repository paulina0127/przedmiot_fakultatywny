import { AppointmentMinList } from "../../components/appointment";
import { PatientsMinList } from "../../components/patient";

const DoctorPanelScreen = () => {
  return (
    <section className="up-section up-section-grid">
      <AppointmentMinList type="Lekarz" />
      <PatientsMinList min={false} span />
    </section>
  );
};

export default DoctorPanelScreen;
