import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { listDoctors } from "../../actions/doctorActions";
import { listPatients } from "../../actions/patientActions";
import { DOCTOR_LIST_RESET } from "../../constants/doctorConsts";
import { PATIENT_LIST_RESET } from "../../constants/patientConsts";
import { validateAppointment } from "../../validators";
import { Loader, Message } from "../general";
import AppointmentForm from "./AppointmentForm";

export const AppointmentCreate = ({ user }) => {
  const dispatch = useDispatch();
  const doctor_id = useParams().id;

  const patientList = useSelector((state) => state.patientList);
  const { patients, loading, count, error } = patientList;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loadingDoctor, countDoctor, errorDoctor } = doctorList;

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

  const initialValues = {
    date: new Date(),
    time: "",
    symptoms: [],
    medicine: [],
    recommendations: "",
    doctor: "",
    patient: "",
  };

  return (
    <>
      {user?.type === "Pacjent" ? (
        <AppointmentForm
          user={user}
          doctorId={doctor_id}
          initialValues={initialValues}
          validate={validateAppointment}
        />
      ) : (
        <AppointmentForm
          user={user}
          doctorId={doctor_id}
          patientsList={patients}
          doctorsList={doctors}
          initialValues={initialValues}
          validate={validateAppointment}
        />
      )}
    </>
  );
};

// export const AppointmentUpdate = ({ user, patientId }) => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getPatient(patientId));
//     return () => {
//       dispatch({ type: PATIENT_DETAILS_RESET });
//     };
//   }, []);

//   const patientDetails = useSelector((state) => state.patientDetails);
//   const { error, loading, patient } = patientDetails;

//   const initialValues = patient
//     ? {
//         first_name: patient.first_name,
//         last_name: patient.last_name,
//         pesel: patient.pesel,
//         birthdate: patient.birthdate,
//         email: patient.email,
//         phone_number: patient.phone_number,
//         street: patient.street,
//         postal_code: patient.postal_code,
//         city: patient.city,
//         medicine: patient.medicine,
//         allergies: patient.allergies,
//         diseases: patient.diseases,
//         link_key: patient.link_key,
//         image: patient.image,
//       }
//     : {};

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : patient && Object.keys(patient).count === 0 ? null : (
//         <PatientForm
//           patientExists={true}
//           patientId={patientId}
//           user={user}
//           initialValues={initialValues}
//           validate={validatePatient}
//           label="Zapisz zmiany"
//         />
//       )}
//     </>
//   );
// };
