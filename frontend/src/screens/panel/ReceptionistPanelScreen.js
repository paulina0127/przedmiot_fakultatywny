import { AppointmentMinList } from "../../components/appointment";
import { DoctorsMinList } from "../../components/doctor";
import { PatientsMinList } from "../../components/patient";

const ReceptionistPanelScreen = () => {
  return (
    <section className="up-section up-section-grid">
      <AppointmentMinList appointType="today" type="recepcjonista" name="Dzisiejsze wizyty"/>
      <AppointmentMinList appointType="not_approved" type="recepcjonista" name="Zgłoszone wizyty"/>
      <PatientsMinList />
      <DoctorsMinList />
    </section>
  );
};

export default ReceptionistPanelScreen;
