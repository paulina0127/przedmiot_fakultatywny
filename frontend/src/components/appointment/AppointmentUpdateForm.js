import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MdOutlineAdd, MdSick } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Form, Formik } from "formik";

import { updateAppointment } from "../../actions/appointmentActions";
import { updatePrescription } from "../../actions/prescriptionActions";
import { DoctorReadMin } from "../doctor/DoctorCRUD";
import { AppointmentModalInfo, NewPrescription } from ".";
import { TextArea } from "../formHelpers/TextArea";
import { Loader, Message, Prescription, MyModal } from "../general";
import { AiOutlineClose } from "react-icons/ai";
import { SiZeromq } from "react-icons/si";
import { GiMedicinePills } from "react-icons/gi"
import { BsFileEarmarkExcelFill, BsHeartPulseFill } from "react-icons/bs"
import panel from "../UserPanel.module.css";
import styles from "./AppointmentForm.module.css";
import "./Calendar.css";

const AppointmentUpdateForm = ({
  initialValues,
  user,
  prescriptions,
  cancellable,
  status
}) => {
  const [key, setKey] = useState("details");
  const appointment_id = useParams().id;
  const [changeAppointStatus, setAppointStatus] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [newPrescription, setNewPrescription] = useState(false);
  const [delPrescription, setDelPrescription] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState(null);

  const handleShowModal = (type, id) => {
    if (type === "prescription") {
      setNewPrescription(true);
    } else if (type === "update-prescription") {
      setDelPrescription(true);
      setPrescriptionId(id)
    } else {
      setAppointStatus(true);
      setStatusType(type);
    }
  };
  const handleCloseModal = () => {
    setAppointStatus(false);
    setNewPrescription(false);
    setDelPrescription(false);
  }

  const dispatch = useDispatch();
  const changeStatusAppointmentHandler = (type) => {
    const value = { status: "" };
    value.status = type === "accept" ? "Potwierdzona" : "Anulowana"
    dispatch(updateAppointment(appointment_id, value));
    setAppointStatus(false);
  };

  const delPrecriptionHandler = () => {
    dispatch(updatePrescription(prescriptionId, { status: "Anulowana" }));
    setDelPrescription(false);
    setPrescriptionId(null);
    window.location.reload();
  };

  const {
    errorAppointmentUpdate,
    successAppointmentUpdate,
    loadingAppointmentUpdate,
  } = useSelector((state) => state.appointmentUpdate);

  const getControlDate = () => {
    const visitDate = new Date(initialValues?.date);
    // Obliczanie daty za 14 dni
    const controlVisitObj = new Date(visitDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    // Konwersja daty na format 'YYYY-MM-DD'
    return controlVisitObj.toISOString().slice(0, 10);
  }

  return (
    <div className="container container-bg container-bg-tabs">
      <div className="container-bg-content">
        <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="details"
            title="Szczegóły wizyty"
            tabClassName="tab firstTab"
          >
            {loadingAppointmentUpdate && <Loader />}
            <div
              className="threeColumnGrid"
              style={{ columnGap: "32px" }}
            >
              <h3 className={styles.h3} style={{ gridColumn: "span 2" }}>
                Objawy i stosowane leki
              </h3>
              <h3 className={styles.h3}>Podsumowanie wizyty</h3>
              <div className="formGroup">
                <div className="d-flex align-items-baseline gap-2 mb-2">
                  <h4 className={styles.h4}>Objawy</h4>
                </div>
                {initialValues?.symptoms && initialValues?.symptoms.length > 0 ? (
                  initialValues?.symptoms.map((symptom, index) => (
                    <div key={index} className="d-flex align-items-baseline gap-2">
                      <span
                        name={`symptoms[${index}]`}
                        disabled={true}
                        className={`px-4 mr-3 my-2 fs-4 ${styles["detail-item"]}`}
                      ><MdSick />{' ' + symptom}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="d-flex justify-content-center">
                    <SiZeromq size="3rem" color="#AEADAD" />
                  </div>
                )}
              </div>
              <div className="formGroup">
                <div className="d-flex align-items-baseline gap-2 mb-2">
                  <h3 className={styles.h4}>Stosowane leki</h3>
                </div>
                {initialValues?.medicine && initialValues?.medicine.length > 0 ? (
                  initialValues?.medicine?.map((med, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-baseline gap-2"
                    >
                      <span
                        name={`medicine[${index}]`}
                        className={`px-4 mr-3 my-2 fs-4 ${styles["detail-item"]}`}
                      ><GiMedicinePills /> {' ' + med}</span>
                    </div>
                  ))
                ) : (
                  <div className="d-flex justify-content-center">
                    <SiZeromq size="3rem" color="#AEADAD" />
                  </div>
                )}
              </div>
              <div className={styles.summaryContainer}>
                {user?.type === "Recepcjonista" ||
                  user?.type === "Admin" ? (
                  <div className="d-flex flex-column gap-4 justify-content-center">
                    <div>
                      <h4 className={panel.h4}>Lekarz</h4>
                      <p className={styles.p}>
                        {`${initialValues?.doctor?.first_name} ${initialValues?.doctor?.last_name}`}
                      </p>
                    </div>
                    <div>
                      <h4 className={panel.h4}>Pacjent</h4>
                      <p className={styles.p}>
                        {`${initialValues?.patient?.first_name} ${initialValues?.patient?.last_name}`}
                      </p>
                    </div>
                  </div>
                ) : user?.type === "Lekarz" ? (
                  <div className="d-flex flex-column justify-content-center">
                    <div>
                      <h4 className={panel.h4}>Pacjent</h4>
                      <p className={styles.p}>
                        {`${initialValues?.patient?.first_name} ${initialValues?.patient?.last_name}`}
                      </p>
                    </div>
                  </div>
                ) : (
                  initialValues.doctor?.id && (
                    <DoctorReadMin doctorId={initialValues?.doctor?.id} />
                  )
                )}

                <div className="d-flex flex-column gap-4 justify-content-center">
                  <div>
                    <h4 className={panel.h4}>Termin</h4>
                    <p className={styles.p}>{`${format(
                      new Date(`${initialValues?.date} ${initialValues.time}:00`),
                      "d LLLL y",
                      {
                        locale: pl,
                      }
                    )}`}</p>
                  </div>
                  <div>
                    <h4 className={panel.h4}>Godzina</h4>
                    <p className={styles.p}>{`${initialValues?.time}`}</p>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="prescriptions"
            title="Zalecenia i recepty"
            tabClassName="tab"
            disabled={new Date() < new Date(`${initialValues?.date}T${initialValues?.time}:00`)}
          >
            {successAppointmentUpdate && (
              <Message variant="success">Zmiany zostały zapisane</Message>
            )}
            {errorAppointmentUpdate && (
              <Message variant="danger">{errorAppointmentUpdate}</Message>
            )}
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                if (user?.type === "Lekarz") {
                  dispatch(updateAppointment(appointment_id, values.recommendations));
                } else {
                  dispatch(updateAppointment(appointment_id, values));
                }
              }}
            >
              {({ values }) => (
                <Form id="form" encType="multipart/form-data">
                  <div className="twoColumnGrid gap-5">
                    <div className="d-flex flex-column">
                      <h3 className={styles.h3}>Zalecenia lekarskie</h3>
                      {initialValues.recommendations === "" && user?.type === "Lekarz" && (
                      <span className={`${styles.h3}`}>Po dodaniu zaleceń wizyta kontrolna ustawi się za 14 dni od dnia tej wizyty</span>
                      )}
                      {initialValues.recommendations !== "" && initialValues.date && (
                      <span className={`${styles.h3}`}>
                        <strong>Wizyta kontrolna: </strong>
                        {getControlDate() + " " + initialValues.time}
                      </span>
                      )}
                      {loadingAppointmentUpdate ? <Loader /> : (
                        <>
                          {(values.recommendations !== "" && values.recommendations !== null) || user?.type === "Lekarz" ?
                            <>
                              <TextArea name="recommendations" disabled={user?.type !== "Lekarz"}/>
                              {user?.type === "Lekarz" && (
                                <button
                                  disabled={values.recommendations === ""}
                                  type="submit"
                                  className="btnRound bg-dark-blue clr-white align-self-center mt-3"
                                >
                                  Zapisz
                                </button>
                              )}
                            </>
                            : <h2 style={{ color: "#AEADAD" }}>Brak zaleceń <BsHeartPulseFill size="3rem" /></h2>}
                        </>
                      )}
                    </div>

                    {user?.type !== "Recepcjonista" && (
                      <div className="d-flex flex-column">
                        <div
                          className="d-grid "
                          style={{ gridTemplateColumns: "auto min-content" }}
                        >
                          <h3 className={`${styles.h3} justify-self-center`}>
                            Recepty
                          </h3>
                          {user?.type === "Lekarz" && (
                            <button
                              type="button"
                              className="btn btn-success btnCircle mx-4"
                              onClick={() => handleShowModal("prescription")}
                            >
                              {" "}
                              <MdOutlineAdd size="1.5rem" />
                            </button>
                          )}
                        </div>

                        {prescriptions && prescriptions.length > 0 ? prescriptions?.map((prescription) => (
                          <Prescription
                            key={prescription.id}
                            prescription={prescription}
                          >
                            {user?.type === "Lekarz" &&
                              prescription.status === "Zatwierdzona" && (
                                <button
                                  type="button"
                                  className="btnRound bg-dark-blue clr-white align-self-center"
                                  onClick={() => handleShowModal("update-prescription", prescription.id)}
                                >
                                  Anuluj receptę
                                </button>
                              )}
                          </Prescription>
                        )) : <h2 style={{ color: "#AEADAD" }}>Brak recept <BsFileEarmarkExcelFill size="2.5rem" /></h2>}
                      </div>
                    )}
                    {newPrescription && (
                      <NewPrescription
                        showModal={true}
                        handleCloseModal={handleCloseModal}
                        id={appointment_id}
                      />
                    )}
                    {delPrescription && (
                      <MyModal
                        showModal={true}
                        title="Anulowanie wystawionej recepty"
                        danger={true}
                      >
                        <p>Potwierdź anulowanie recepty</p>
                        <hr className="text-secondary" />
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-secondary rounded-pill fw-bold shadow-sm mx-2 px-5"
                            onClick={handleCloseModal}
                          >
                            Wróć
                          </button>
                          <button
                            type="button"
                            className={`btn btn-danger rounded-pill fw-bold shadow-sm px-5`}
                            onClick={() => delPrecriptionHandler()}
                          >
                            Anuluj receptę <AiOutlineClose />
                          </button>
                        </div>
                      </MyModal>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </Tab>
        </Tabs>

      </div>
      {key === "details" && user?.type === "Pacjent"
        && cancellable && status !== "Odbyta" && status !== "Anulowana" && (
          <button
            type="button"
            className="btnSquare bg-dark-blue clr-white mx-4 mt-3"
            style={{ justifySelf: "end", alignSelf: "end" }}
            form="form"
            onClick={() => handleShowModal("reject")}
            disabled={loadingAppointmentUpdate}
          >
            Odwołaj wizytę
          </button>
        )}
      {key === "details" &&
        user?.type === "Recepcjonista" &&
        status === "Oczekuje na potwierdzenie" && (
          <div
            className="btnGroup"
            style={{
              justifySelf: "end",
              alignSelf: "end",
            }}
          >
            <button
              type="button"
              className="btnSquare bg-blue clr-white mt-3"
              form="form"
              onClick={() => handleShowModal("accept")}
              disabled={loadingAppointmentUpdate}
            >
              Potwierdź wizytę
            </button>
            <button
              type="button"
              className="btnSquare bg-dark-blue clr-white mt-3"
              form="form"
              onClick={() => handleShowModal("reject")}
              disabled={loadingAppointmentUpdate}
            >
              Odwołaj wizytę
            </button>
          </div>
        )}
      {changeAppointStatus && (
        <MyModal
          showModal={true}
          title={
            statusType === "accept" && user?.type === "Recepcjonista" ? "Akceptowanie wizyty"
              : statusType === "reject" && user?.type === "Recepcjonista" ? "Odrzucanie wizyty"
                : "Odwoływanie wizyty"
          }
          danger={statusType === "reject" ? true : "accept"}
        >
          <AppointmentModalInfo
            type={statusType}
            handleCloseModal={handleCloseModal}
            handleChangeStatus={changeStatusAppointmentHandler}
            userType={user?.type}
          />
        </MyModal>
      )}
    </div>
  );
};

export default AppointmentUpdateForm;
