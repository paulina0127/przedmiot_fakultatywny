import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPatient } from "../../actions/patientActions";
import { PATIENT_DETAILS_RESET } from "../../constants/patientConsts";
import { validatePatient } from "../../validators";
import { Loader, Message } from "../general";
import { PatientForm } from "../patient";

export const PatientProfileCreate = ({ user }) => {
  const initialValues = {
    first_name: "",
    last_name: "",
    pesel: "",
    birthdate: new Date(),
    email: "",
    phone_number: "",
    street: "",
    postal_code: "",
    city: "",
    medicine: [],
    allergies: [],
    diseases: [],
    image: null,
  };

  return (
    <PatientForm
      user={user}
      initialValues={initialValues}
      validate={validatePatient}
      label="Zapisz"
    />
  );
};

export const PatientProfileUpdate = ({ user, patientId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatient(patientId));
    return () => {
      dispatch({ type: PATIENT_DETAILS_RESET });
    };
  }, []);

  const patientDetails = useSelector((state) => state.patientDetails);
  const { error, loading, patient } = patientDetails;

  const initialValues = patient
    ? {
        first_name: patient.first_name,
        last_name: patient.last_name,
        pesel: patient.pesel,
        birthdate: patient.birthdate,
        email: patient.email,
        phone_number: patient.phone_number,
        street: patient.street,
        postal_code: patient.postal_code,
        city: patient.city,
        medicine: patient.medicine,
        allergies: patient.allergies,
        diseases: patient.diseases,
        link_key: patient.link_key,
        image: patient.image,
      }
    : {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : patient && Object.keys(patient).count === 0 ? null : (
        <PatientForm
          patientExists={true}
          patientId={patientId}
          user={user}
          initialValues={initialValues}
          validate={validatePatient}
          label="Zapisz zmiany"
        />
      )}
    </>
  );
};
