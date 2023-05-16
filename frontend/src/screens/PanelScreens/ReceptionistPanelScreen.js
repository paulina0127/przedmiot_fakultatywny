import { DoctorsMinList } from "../../components/doctor";
import { PatientsMinList } from "../../components/patient";

function ReceptionistPanelScreen() {
  return (
    <section className="up-section up-section-grid">
      <PatientsMinList />
      <DoctorsMinList />
    </section>
  );
}

export default ReceptionistPanelScreen;
