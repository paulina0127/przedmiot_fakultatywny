import { AppointmentMinList } from "../../components/appointment";
import { ChooseDoctor } from "../../components/general";

const PatientFormScreen = () => {
  return (
    <section className="up-section up-section-grid">
      <ChooseDoctor />
      <AppointmentMinList type="Pacjent" />
    </section>
  );
};

export default PatientFormScreen;
