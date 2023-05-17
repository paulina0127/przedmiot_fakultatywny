import React, { useState } from "react";
import { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";

import { DoctorReadMin } from "../doctor/DoctorCRUD";
import { TextField } from "../formHelpers";
import panel from "../UserPanel.module.css";
import styles from "./AppointmentForm.module.css";

function AppointmentForm({ doctorId }) {
  const [date, setDate] = useState(new Date());

  const slots = [
    "9:00",
    "9:30",
    "10:00",
    "11:00",
    "11:30",
    "13:30",
    "14:00",
    "15:00",
    "16:00",
    "16:30",
  ];

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container container-bg">
      {/* {loadingUpdate && <Loader />}
      {loadingCreate && <Loader />}
      {successUpdate && (
        <Message variant="success">Pomyślnie zapisano zmiany</Message>
      )}
      {successCreate && (
        <Message variant="success">Pomyślnie utworzono kartę pacjenta</Message>
      )}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}

      <div className="container-bg-content">
        <h2 className={panel.h2}>Szczegóły wizyty</h2>
        <div className={styles.appointmentForm}>
          <div className="d-flex flex-column" style={{ gridCol: "span 3" }}>
            <h3 className={styles.h3}>Wybierz datę i godzinę</h3>
            <div className="twoColumnGrid gap-5">
              <Calendar value={date} onChange={handleDateChange} />
              <div className={styles.slotsContainer}>
                {slots.map((slot, index) => (
                  <div key={index}>
                    <input
                      id={`slot_${index}`}
                      type="radio"
                      name="slot"
                      value={slot}
                    />
                    <label htmlFor={`slot_${index}`} className={styles.slot}>
                      {slot}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <DoctorReadMin doctorId={doctorId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;
