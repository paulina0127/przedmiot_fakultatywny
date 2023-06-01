import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Calendar from "react-calendar";
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Field, FieldArray, Form, Formik } from "formik";

import { createAppointment } from "../../actions/appointmentActions";
import { getDoctor } from "../../actions/doctorActions";
import { getPatient } from "../../actions/patientActions";
import { listSlots } from "../../actions/statsAndSlotsActions";
import { SLOT_LIST_RESET } from "../../constants/statsAndSlotsConsts";
import { DoctorReadMin } from "../doctor/DoctorCRUD";
import { RadioField, SelectField, TextField } from "../formHelpers";
import { Loader, Message } from "../general";
import panel from "../UserPanel.module.css";
import styles from "./AppointmentForm.module.css";
import "./Calendar.css";

const AppointmentForm = ({
  initialValues,
  validate,
  patientsList,
  doctorsList,
  doctorId,
  user,
}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("date");

  // Slots
  const { slots, loadingSlots, errorSlots } = useSelector(
    (state) => state.slotsList
  );

  // Patients and doctors for receptionist
  const patients = patientsList?.map((patient) => ({
    value: patient.id.toString(),
    label: patient.pesel,
  }));

  const findPatient = ({ value }) => {
    return patients.find((patient) => patient.value === value);
  };

  const doctors = doctorsList?.map((doctor) => ({
    value: doctor.id.toString(),
    label: `${doctor.first_name} ${doctor.last_name}`,
  }));

  const findDoctor = ({ value }) => {
    return doctors.find((doctor) => doctor.value === value);
  };

  // Slots params
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [doctor, setDoctor] = useState();

  const slotsParams = {
    doctor: doctorId ? doctorId : doctor,
    date: date,
  };

  const {
    errorAppointmentCreate,
    successAppointmentCreate,
    loadingAppointmentCreate,
  } = useSelector((state) => state.appointmentCreate);

  useEffect(() => {
    if (doctor || doctorId) {
      dispatch(listSlots(slotsParams));
      return () => {
        dispatch({ type: SLOT_LIST_RESET });
      };
    }
  }, [date, doctor, successAppointmentCreate]);

  return (
    <div className="container container-bg container-bg-tabs">
      <div className="container-bg-content">
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            console.log(values);
            dispatch(createAppointment(values));
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form id="form" encType="multipart/form-data">
              <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="date" title="Termin" tabClassName="tab firstTab">
                  <h3 className={styles.h3} style={{ gridColumn: "span 3" }}>
                    Wybierz datę i godzinę wizyty
                  </h3>
                  <div className="threeColumnGrid gap-5 align-items-center">
                    <Calendar
                      minDate={new Date()}
                      value={values.date}
                      onChange={(date) => {
                        setFieldValue("date", format(date, "yyyy-MM-dd"));
                        setDate(format(date, "yyyy-MM-dd"));
                      }}
                    />
                    <div className={styles.slotsContainer}>
                      {loadingSlots ? (
                        <Loader style={{ gridColumn: "span 5" }} />
                      ) : errorSlots ? (
                        <Message variant="danger">{errorSlots}</Message>
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
                            <Field
                              id={`slot_${index}`}
                              type="radio"
                              name="time"
                              value={slot}
                              className={`form-control rounded-pill border-2 shadow-sm px-4`}
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

                    {user?.type === "Recepcjonista" ||
                    user?.type === "Admin" ? (
                      <div>
                        <h3 className={panel.h3}>Lekarz</h3>
                        <Field
                          name="doctor"
                          component={SelectField}
                          options={doctors}
                          isSearchable={true}
                          placeholder="Wybierz lekarza"
                          onChange={({ value }) => {
                            setFieldValue("doctor", value);
                            setDoctor(value);
                          }}
                        />
                        <h3 className={panel.h3}>Pacjent</h3>
                        <Field
                          name="patient"
                          component={SelectField}
                          options={patients}
                          isSearchable={true}
                          placeholder="Wybierz pacjenta"
                          onChange={({ value }) => {
                            setFieldValue("patient", value);
                          }}
                        />
                      </div>
                    ) : (
                      <DoctorReadMin doctorId={doctorId} />
                    )}
                    {values.date !== '' && values.time !== '' && values.doctor !== '' && values.patient !== '' ? 
                    <button
                      type="button"
                      className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
                      style={{ justifySelf: "end", gridColumn: "span 3" }}
                      onClick={() => setKey("details")}
                    >
                      Dalej
                    </button>
                    : null}             
                  </div>
                </Tab>
                {values.date !== '' && values.time !== '' && values.doctor !== '' && values.patient !== '' ? 
                <Tab eventKey="details" title="Podsumowanie" tabClassName="tab">
                  {loadingAppointmentCreate && <Loader />}
                  {successAppointmentCreate && (
                    <Message variant="success">
                      {user?.type === "Pacjent"
                        ? "Wizyta została umówiona. Proszę czekać na potwierdzenie wizyty."
                        : "Wizyta została umówiona."}
                    </Message>
                  )}

                  {errorAppointmentCreate && (
                    <Message variant="danger">{errorAppointmentCreate}</Message>
                  )}
                  <div
                    className="threeColumnGrid"
                    style={{ columnGap: "32px" }}
                  >
                    <h3 className={styles.h3} style={{ gridColumn: "span 2" }}>
                      Uzupełnij objawy i stosowane leki{" "}
                      <span
                        style={{
                          fontSize: "16px",
                          color: "var(--clr-dark-blue-hover)",
                        }}
                      >
                        (Opcjonalne)
                      </span>
                    </h3>
                    <h3 className={styles.h3}>Podsumowanie wizyty</h3>
                    <div className="formGroup">
                      <FieldArray name="symptoms">
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { symptoms } = values ? values : {};
                          return (
                            <>
                              <div className="d-flex align-items-baseline gap-2">
                                <h4 className={styles.h4}>Objawy</h4>
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
                    <div className="formGroup">
                      <FieldArray name="medicine">
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { medicine } = values ? values : {};
                          return (
                            <>
                              <div className="d-flex align-items-baseline gap-2">
                                <h4 className={styles.h4}>Stosowane leki</h4>
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

                    <div className={styles.summaryContainer}>
                      {user?.type === "Recepcjonista" ||
                      user?.type === "Admin" ? (
                        <div className="d-flex flex-column gap-4 justify-content-center">
                          <div>
                            <h4 className={panel.h4}>Lekarz</h4>
                            <p className={styles.p}>
                              {findDoctor({ value: values?.doctor })?.label}
                            </p>
                          </div>
                          <div>
                            <h4 className={panel.h4}>Pacjent</h4>
                            <p className={styles.p}>
                              {findPatient({ value: values?.patient })?.label}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <DoctorReadMin doctorId={doctorId} />
                      )}

                      <div className="d-flex flex-column gap-4 justify-content-center">
                        <div>
                          <h4 className={panel.h4}>Termin</h4>
                          <p className={styles.p}>{`${format(
                            new Date(date),
                            "d LLL y",
                            {
                              locale: pl,
                            }
                          )}`}</p>
                        </div>
                        <div>
                          <h4 className={panel.h4}>Godzina</h4>
                          <p className={styles.p}>{`${values?.time}`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                : 
                <Tab eventKey="disabled" title="Podsumowanie" tabClassName="tab" disabled/>}
              </Tabs>
            </Form>
          )}
        </Formik>
      </div>
      {key === "details" && (
        <button
          type="submit"
          className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
          style={{ justifySelf: "end", alignSelf: "end" }}
          form="form"
          disabled={loadingAppointmentCreate}
        >
          Zatwierdź
        </button>
      )}
    </div>
  );
};

export default AppointmentForm;
