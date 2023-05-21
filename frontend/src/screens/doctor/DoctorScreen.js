import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { AppointmentList } from "../../components/appointment";
import { DoctorRead } from "../../components/doctor";
import { PatientList } from "../../components/patient";

const DoctorScreen = () => {
  const [key, setKey] = useState("profile");

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const location = useLocation();
  const doctor_id = useParams().id;

  return (
    <section className="up-section">
      <div className="container container-bg container-bg-tabs">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="profile"
            title="Karta lekarza"
            tabClassName="tab firstTab"
          >
            <DoctorRead doctorId={doctor_id} />
          </Tab>
          <Tab eventKey="patients" title="Pacjenci" tabClassName="tab">
            <PatientList doctorId={doctor_id} />
          </Tab>
          <Tab eventKey="appointments" title="Wizyty" tabClassName="tab">
            <AppointmentList doctorId={doctor_id} type="Lekarz" />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default DoctorScreen;
