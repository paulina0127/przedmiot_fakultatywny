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

import { updateAppointment } from "../../actions/appointmentActions";
import { getDoctor } from "../../actions/doctorActions";
import { getPatient } from "../../actions/patientActions";
import { listSlots } from "../../actions/statsAndSlotsActions";
import { SLOT_LIST_RESET } from "../../constants/statsAndSlotsConsts";
import { DoctorReadMin } from "../doctor/DoctorCRUD";
import { RadioField, SelectField, TextField } from "../formHelpers";
import { TextArea } from "../formHelpers/TextArea";
import { Loader, Message, Prescription } from "../general";
import panel from "../UserPanel.module.css";
import styles from "./AppointmentForm.module.css";
import "./Calendar.css";

const AppointmentUpdateForm = ({
  initialValues,
  validate,
  user,
  prescriptions,
  cancellable,
}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("details");

  const {
    errorAppointmentUpdate,
    successAppointmentUpdate,
    loadingAppointmentUpdate,
  } = useSelector((state) => state.appointmentUpdate);

  return (
    <div className="container container-bg container-bg-tabs">
      <div className="container-bg-content">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            dispatch(updateAppointment(values));
          }}
        >
          {({ values, isValid, setFieldValue }) => (
            <Form id="form" encType="multipart/form-data">
              <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab
                  eventKey="details"
                  title="Szczegóły wizyty"
                  tabClassName="tab firstTab"
                >
                  {loadingAppointmentUpdate && <Loader />}
                  {successAppointmentUpdate && (
                    <Message variant="success">Zmiany zostały zapisane</Message>
                  )}

                  {errorAppointmentUpdate && (
                    <Message variant="danger">{errorAppointmentUpdate}</Message>
                  )}
                  <div
                    className="threeColumnGrid"
                    style={{ columnGap: "32px" }}
                  >
                    <h3 className={styles.h3} style={{ gridColumn: "span 2" }}>
                      Objawy i stosowane leki
                    </h3>
                    <h3 className={styles.h3}>Podsumowanie wizyty</h3>
                    <div className="formGroup">
                      <FieldArray name="symptoms">
                        {({ push, remove, form }) => {
                          const { values } = form;
                          const { symptoms } = values ? values : {};
                          return (
                            <>
                              <div className="d-flex align-items-baseline gap-2 mb-2">
                                <h4 className={styles.h4}>Objawy</h4>
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
                              <div className="d-flex align-items-baseline gap-2 mb-2">
                                <h4 className={styles.h4}>Stosowane leki</h4>
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
                              {`${values?.doctor?.first_name} ${values?.doctor?.last_name}`}
                            </p>
                          </div>
                          <div>
                            <h4 className={panel.h4}>Pacjent</h4>
                            <p className={styles.p}>
                              {`${values?.patient?.first_name} ${values?.patient?.last_name}`}
                            </p>
                          </div>
                        </div>
                      ) : user?.type === "Lekarz" ? (
                        <div className="d-flex flex-column justify-content-center">
                          <div>
                            <h4 className={panel.h4}>Pacjent</h4>
                            <p className={styles.p}>
                              {`${values?.patient?.first_name} ${values?.patient?.last_name}`}
                            </p>
                          </div>
                        </div>
                      ) : (
                        values.doctor?.id && (
                          <DoctorReadMin doctorId={values?.doctor?.id} />
                        )
                      )}

                      <div className="d-flex flex-column gap-4 justify-content-center">
                        <div>
                          <h4 className={panel.h4}>Termin</h4>
                          <p className={styles.p}>{`${format(
                            new Date(`${values?.date} ${values.time}:00`),
                            "d LLLL y",
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
                <Tab
                  eventKey="prescriptions"
                  title="Zalecenia i recepty"
                  tabClassName="tab"
                  disabled={
                    values.status !== "Odbyta" && user?.type !== "Lekarz"
                  }
                >
                  <div class="twoColumnGrid gap-5">
                    <div className="d-flex flex-column">
                      <h3 className={styles.h3}>Zalecenia lekarskie</h3>
                      <TextArea name="recommendations" />
                      {user?.type === "Lekarz" && (
                        <button
                          type="submit"
                          className="btnRound bg-dark-blue clr-white align-self-center mt-3"
                        >
                          Zapisz
                        </button>
                      )}
                    </div>
                    <div className="d-flex flex-column">
                      <div
                        className="d-grid "
                        style={{ gridTemplateColumns: "auto min-content" }}
                      >
                        <h3 className={`${styles.h3} justify-self-center`}>
                          Recepty
                        </h3>
                        <button className="btn btn-success btnCircle mx-4">
                          {" "}
                          <MdOutlineAdd size="1.5rem" />
                        </button>
                      </div>
                      {prescriptions?.map((prescription) => (
                        <Prescription
                          key={prescription.id}
                          prescription={prescription}
                        >
                          {user?.type === "Lekarz" &&
                            prescription.status === "Zatwierdzona" && (
                              <button
                                type="button"
                                className="btnRound bg-dark-blue clr-white align-self-center"
                              >
                                Anuluj receptę
                              </button>
                            )}
                        </Prescription>
                      ))}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </Form>
          )}
        </Formik>
      </div>
      {key === "details" && user?.type === "Pacjent" && cancellable && (
        <button
          type="submit"
          className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
          style={{ justifySelf: "end", alignSelf: "end" }}
          form="form"
          disabled={loadingAppointmentUpdate}
        >
          Odwołaj wizytę
        </button>
      )}
    </div>
  );
};

export default AppointmentUpdateForm;
