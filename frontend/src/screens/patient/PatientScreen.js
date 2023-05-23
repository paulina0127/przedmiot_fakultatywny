import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import {
  AppointmentCreate,
  AppointmentList,
} from "../../components/appointment";
import { PatientCreate, PatientUpdate } from "../../components/patient";

const PatientScreen = () => {
  const [key, setKey] = useState("profile");

  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const location = useLocation();
  const patient_id = useParams().id;

  return (
    <section className="up-section">
      {user?.type === "Nowy użytkownik" ||
      ((user?.type === "Recepcjonista" || user?.type === "Admin") &&
        location.pathname.startsWith("/rejestracja")) ? (
        <div className="container container-bg">
          <PatientCreate user={user} />
        </div>
      ) : user?.type === "Pacjent" ? (
        <div className="container container-bg">
          <PatientUpdate
            user={user}
            patientExists={true}
            patientId={user?.profile?.id}
          />
        </div>
      ) : (
        user && (
          <div className="container container-bg container-bg-tabs">
            <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
              <Tab
                eventKey="profile"
                title="Karta pacjenta"
                tabClassName="tab firstTab"
              >
                <PatientUpdate
                  user={user}
                  patientExists={true}
                  patientId={patient_id}
                />
              </Tab>
              <Tab
                eventKey="appointments"
                title="Historia leczenia"
                tabClassName="tab"
              >
                <AppointmentList patientId={patient_id} type="Pacjent" />
              </Tab>
            </Tabs>
          </div>
        )
      )}
    </section>
  );
};

export default PatientScreen;
