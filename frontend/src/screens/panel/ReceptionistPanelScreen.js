import { AppointmentMinList } from "../../components/appointment";
import { DoctorsMinList } from "../../components/doctor";
import { PatientsMinList } from "../../components/patient";
import { StatisticsMinList } from "../../components/statistics";

const ReceptionistPanelScreen = () => {
  return (
    <section className="up-section up-section-grid">
      <AppointmentMinList type="Recepcjonista" />
      <PatientsMinList />
      <DoctorsMinList />
      <StatisticsMinList />
    </section>
  );
};

export default ReceptionistPanelScreen;
