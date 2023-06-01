import { AppointmentMinList } from "../../components/appointment";
import { PatientsMinList } from "../../components/patient";

const DoctorPanelScreen = () => {
  return (
    <section className="up-section up-section-grid">
      <AppointmentMinList appointType="today" type="Lekarz" name="Dzisiejsze wizyty"/>
      <PatientsMinList />
    </section>
  );
};

export default DoctorPanelScreen;
