import { Accordion } from "react-bootstrap";
import {
  BsFillCalendarFill,
  BsFillInfoCircleFill,
  BsReceipt,
} from "react-icons/bs";
import { GiPill } from "react-icons/gi";
import { format } from "date-fns";

import styles from "../../appointment/AppointmentForm.module.css";
import "./Prescription.css";

const Prescription = ({ prescription, children }) => {
  return (
    <Accordion bsPrefix="prescriptionInfo">
      <Accordion.Button bsPrefix="prescriptionHeader">
        <BsReceipt size="2rem" />
        <div className="d-flex align-items-center gap-1">
          <BsFillCalendarFill size="1.25rem" />
          <p>{format(new Date(prescription.expires_at), "dd-MM-yyyy")}</p>
        </div>
        <div className="d-flex align-items-center gap-1">
          <BsFillInfoCircleFill size="1.5rem" />
          <p>{prescription.status}</p>
        </div>
      </Accordion.Button>
      <Accordion.Body bsPrefix="prescriptionBody">
        <div className="d-flex align-items-center justify-content-center gap-2 fs-3">
          <h4 className={`${styles.h4} fs-3`}>Kod dostępu:</h4>
          <p>{prescription.access_code}</p>
        </div>
        <hr />
        <div className="d-flex flex-column align-items-start gap-2">
          <div className="d-flex align-items-center gap-2">
            <h4 className={styles.h4}>Wystawiono:</h4>
            <p>
              {format(new Date(prescription.created_at), "dd-MM-yyyy HH:mm")}
            </p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <h4 className={styles.h4}>Wygasa:</h4>
            <p>
              {format(new Date(prescription.expires_at), "dd-MM-yyyy HH:mm")}
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column align-items-start gap-2">
          <ul className="list-unstyled">
            {prescription.medicine.map((med) => {
              return <li key={med.id} className="my-2 fw-bold fst-italic"><GiPill />{med}</li>;
            })}
          </ul>
        </div>
        {children}
      </Accordion.Body>
    </Accordion>
  );
};

export default Prescription;
