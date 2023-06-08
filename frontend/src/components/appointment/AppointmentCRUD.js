import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { format } from "date-fns";

import { AppointmentForm, AppointmentUpdateForm } from ".";
import { getAppointment } from "../../actions/appointmentActions";
import { listDoctors } from "../../actions/doctorActions";
import { listPatients } from "../../actions/patientActions";
import { listPrescriptions } from "../../actions/prescriptionActions";
import {
  APPOINTMENT_DETAILS_RESET,
  APPOINTMENT_UPDATE_RESET,
} from "../../constants/appointmentConsts";
import { DOCTOR_LIST_RESET } from "../../constants/doctorConsts";
import { PATIENT_LIST_RESET } from "../../constants/patientConsts";
import { PRESCRIPTION_LIST_RESET } from "../../constants/prescriptionConsts";
import { validateAppointment } from "../../validators";
import { Loader, Message } from "../general";

export const AppointmentCreateForPatient = ({ user }) => {
  const doctor_id = useParams().id;

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;
  const minDate = isWeekend ? today : tomorrow;

  const initialValues = {
    date: format(minDate, "yyyy-MM-dd"),
    time: "",
    symptoms: [],
    medicine: [],
    doctor: doctor_id,
  };

  return (
    <AppointmentForm
      user={user}
      doctorId={doctor_id}
      initialValues={initialValues}
      validate={validateAppointment}
    />
  );
};

export const AppointmentCreate = ({ user }) => {
  const dispatch = useDispatch();

  const initialValues = {
    date: format(new Date(), "yyyy-MM-dd"),
    time: "",
    symptoms: [],
    medicine: [],
    doctor: "",
    patient: "",
  };

  const { patients, loadingPatients, countPatients, errorPatients } =
    useSelector((state) => state.patientList);

  const { doctors, loadingDoctors, countDoctors, errorDoctors } = useSelector(
    (state) => state.doctorList
  );

  useEffect(() => {
    dispatch(listPatients({}));
    return () => {
      dispatch({ type: PATIENT_LIST_RESET });
    };
  }, []);

  useEffect(() => {
    dispatch(listDoctors({}));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
    };
  }, []);

  return (
    <AppointmentForm
      user={user}
      patientsList={patients}
      doctorsList={doctors}
      initialValues={initialValues}
      validate={validateAppointment}
    />
  );
};

export const AppointmentUpdate = ({ user, appointmentId }) => {
  const dispatch = useDispatch();

  const { successPrescriptionCreate } = useSelector(
    (state) => state.prescriptionCreate
  );

  useEffect(() => {
    dispatch(getAppointment(appointmentId));
    return () => {
      dispatch({ type: APPOINTMENT_DETAILS_RESET });
      dispatch({ type: APPOINTMENT_UPDATE_RESET });
    };
  }, []);

  useEffect(() => {
    dispatch(listPrescriptions(appointmentId));
    return () => {
      dispatch({ type: PRESCRIPTION_LIST_RESET });
    };
  }, [successPrescriptionCreate]);

  const { errorAppointment, loadingAppointment, appointment } = useSelector(
    (state) => state.appointmentDetails
  );

  const { prescriptions } = useSelector((state) => state.prescriptionList);

  const timeUntilApt =
    appointment &&
    (new Date(`${appointment.date} ${appointment.time}:00`) - new Date()) /
      (1000 * 60 * 60);

  const initialValues = appointment
    ? {
        date: appointment.date,
        time: appointment.time,
        symptoms: appointment.symptoms,
        medicine: appointment.medicine,
        doctor: appointment.doctor,
        patient: appointment.patient,
        status: appointment.status,
        recommendations: appointment.recommendations,
      }
    : {};

  return (
    <>
      {loadingAppointment ? (
        <Loader />
      ) : errorAppointment ? (
        <Message variant="danger">{errorAppointment}</Message>
      ) : appointment && Object.keys(appointment).count === 0 ? null : (
        <AppointmentUpdateForm
          user={user}
          prescriptions={prescriptions}
          initialValues={initialValues}
          validate={validateAppointment}
          cancellable={timeUntilApt > 24}
          status={initialValues.status}
        />
      )}
    </>
  );
};
