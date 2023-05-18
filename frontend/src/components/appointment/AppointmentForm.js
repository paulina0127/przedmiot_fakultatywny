import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Calendar from "react-calendar";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { Field, FieldArray, Form, Formik } from "formik";

import { listSlots } from "../../actions/statsAndSlotsActions";
import { SLOT_LIST_RESET } from "../../constants/statsAndSlotsConsts";
import { DoctorReadMin } from "../doctor/DoctorCRUD";
import { SelectField } from "../formHelpers";
import { Loader, Message } from "../general";
import panel from "../UserPanel.module.css";
import styles from "./AppointmentForm.module.css";
import "./Calendar.css";

function AppointmentForm({
  initialValues,
  validate,
  patientsList,
  doctorsList,
  doctorId,
  user,
}) {
  const [key, setKey] = useState("date");
  const [date, setDate] = useState(new Date());

  const slotsList = useSelector((state) => state.slotsList);
  const { slots, loading, error } = slotsList;

  const patients = patientsList?.map((patient) => ({
    value: patient.id.toString(),
    label: patient.pesel,
  }));

  const doctors = doctorsList?.map((doctor) => ({
    value: doctor.id.toString(),
    label: `${doctor.first_name} ${doctor.last_name}`,
  }));

  const dispatch = useDispatch();

  const slotsParams = {
    doctor: doctorId,
    date: format(date, "yyyy-MM-dd"),
  };

  useEffect(() => {
    dispatch(listSlots(slotsParams));
    return () => {
      dispatch({ type: SLOT_LIST_RESET });
    };
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="container container-bg container-bg-tabs">
      <div className="container-bg-content">
        <Formik
          initialValues={initialValues}
          // validationSchema={validate}
          // onSubmit={(values) => {
          //   if (slotsExists) {
          //     const updatedValues = {};
          //     for (const key in values) {
          //       if (values[key] !== initialValues[key]) {
          //         updatedValues[key] = values[key];
          //       }
          //     }
          //     dispatch(updatePatient(slotsId, updatedValues));
          //   } else {
          //     dispatch(createPatient(values));
          //   }
          // }}
        >
          {({ values }) => (
            <Form id="form" encType="multipart/form-data">
              <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="date" title="Termin" tabClassName="firstTab">
                  <h3 className={styles.h3} style={{ gridColumn: "span 3" }}>
                    Wybierz datę i godzinę wizyty
                  </h3>
                  <div className="threeColumnGrid gap-5 align-items-center">
                    <Calendar
                      value={date}
                      onChange={handleDateChange}
                      minDate={new Date()}
                    />
                    <div className={styles.slotsContainer}>
                      {loading ? (
                        <Loader style={{ gridColumn: "span 5" }} />
                      ) : error ? (
                        <Message variant="danger">{error}</Message>
                      ) : typeof slots === "undefined" || slots.length === 0 ? (
                        <Message
                          variant="danger"
                          style={{ gridColumn: "span 5" }}
                        >
                          Brak wolnych terminów
                        </Message>
                      ) : (
                        slots?.map((slot, index) => (
                          <div key={index} style={{ width: "min-content" }}>
                            <input
                              id={`slot_${index}`}
                              type="radio"
                              name="slot"
                              value={slot}
                            />
                            <label
                              htmlFor={`slot_${index}`}
                              className={styles.slot}
                            >
                              {slot}
                            </label>
                          </div>
                        ))
                      )}
                    </div>

                    {user?.type === "Recepcjonista" ? (
                      <div>
                        <h3 className={panel.h3}>Lekarz</h3>
                        <Field
                          name="doctor"
                          component={SelectField}
                          options={doctors}
                          isSearchable={true}
                          placeholder="Wybierz lekarza"
                        />

                        <h3 className={panel.h3}>Pacjent</h3>
                        <Field
                          name="patient"
                          component={SelectField}
                          options={patients}
                          isSearchable={true}
                          placeholder="Wybierz pacjenta"
                        />
                      </div>
                    ) : (
                      <DoctorReadMin doctorId={doctorId} />
                    )}

                    <button
                      className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
                      style={{ justifySelf: "end", gridColumn: "span 3" }}
                      onClick={() => setKey("details")}
                    >
                      Dalej
                    </button>
                  </div>
                </Tab>
                <Tab eventKey="details" title="Podsumowanie">
                  <div className="formGroup">
                    <FieldArray name="medicine">
                      {({ push, remove, form }) => {
                        const { values } = form;
                        const { medicine } = values ? values : {};
                        return (
                          <>
                            <div className="d-flex align-items-baseline gap-2">
                              <h4 className={panel.h4}>Stosowane leki</h4>
                              <button
                                type="button"
                                className="btn btn-success btnCircle"
                                onClick={() => push("")}
                              >
                                <MdOutlineAdd />
                              </button>
                            </div>

                            {medicine?.map((med, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-baseline gap-2"
                              >
                                <Field
                                  name={`medicine[${index}]`}
                                  className="form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1"
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger btnCircle"
                                  onClick={() => remove(index)}
                                >
                                  <HiOutlineTrash />
                                </button>
                              </div>
                            ))}
                          </>
                        );
                      }}
                    </FieldArray>
                  </div>

                  <div className="formGroup">
                    <FieldArray name="symptoms">
                      {({ push, remove, form }) => {
                        const { values } = form;
                        const { symptoms } = values ? values : {};
                        return (
                          <>
                            <div className="d-flex align-items-baseline gap-2">
                              <h4 className={panel.h4}>Objawy</h4>
                              <button
                                type="button"
                                className="btn btn-success btnCircle"
                                onClick={() => push("")}
                              >
                                <MdOutlineAdd />
                              </button>
                            </div>

                            {symptoms?.map((symptom, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-baseline gap-2"
                              >
                                <Field
                                  name={`symptoms[${index}]`}
                                  className="form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1"
                                />
                                <button
                                  type="button"
                                  className="btn btn-danger btnCircle"
                                  onClick={() => remove(index)}
                                >
                                  <HiOutlineTrash />
                                </button>
                              </div>
                            ))}
                          </>
                        );
                      }}
                    </FieldArray>
                  </div>
                </Tab>
              </Tabs>
            </Form>
          )}
        </Formik>
        {key === "details" && (
          <button
            type="submit"
            className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
            style={{ justifySelf: "end" }}
            form="form"
          >
            Zatwierdź
          </button>
        )}
      </div>
    </div>
  );
}

export default AppointmentForm;
