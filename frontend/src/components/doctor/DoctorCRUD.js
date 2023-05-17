import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDoctor } from "../../actions/doctorActions";
import { DOCTOR_DETAILS_RESET } from "../../constants/doctorConsts";
import { Loader, Message } from "../general";
import { DoctorInfo } from "../general";
import DoctorForm from "./DoctorForm";

export const DoctorRead = ({ doctorId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctor(doctorId));
    return () => {
      dispatch({ type: DOCTOR_DETAILS_RESET });
    };
  }, []);

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { error, loading, doctor } = doctorDetails;

  const initialValues = doctor
    ? {
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        gender: doctor.gender,
        specializations: doctor.specializations,
        image: doctor.image,
      }
    : {};

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : doctor && Object.keys(doctor).count === 0 ? null : (
        <DoctorForm doctorId={doctorId} initialValues={initialValues}/>
      )}
    </>
  );
};

export const DoctorReadMin = ({ doctorId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctor(doctorId));
    return () => {
      dispatch({ type: DOCTOR_DETAILS_RESET });
    };
  }, []);

  const doctorDetails = useSelector((state) => state.doctorDetails);
  const { error, loading, doctor } = doctorDetails;

  const values = doctor
    ? {
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        gender: doctor.gender,
        specializations: doctor.specializations,
        image: doctor.image,
      }
    : null;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : values ? (
        <DoctorInfo doctor={values} />
      ) : null}
    </>
  );
};
