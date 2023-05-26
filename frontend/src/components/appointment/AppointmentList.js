import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listAppointments } from "../../actions/appointmentActions";
import { AppointmentsTable } from "../../components/appointment";
import { Loader, Message, Pagination } from "../../components/general";
import panel from "../../components/UserPanel.module.css";
import { APPOINTMENT_LIST_RESET } from "../../constants/appointmentConsts";

const AppointmentList = ({ doctorId, patientId, type }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    appointments,
    loadingAppointments,
    countAppointments,
    errorAppointments,
  } = useSelector((state) => state.appointmentList);

  const dispatch = useDispatch();

  const params = {
    page: page,
    doctor: doctorId ? doctorId : "",
    patient: patientId ? patientId : "",
  };

  useEffect(() => {
    dispatch(listAppointments(params));
    return () => {
      dispatch({ type: APPOINTMENT_LIST_RESET });
    };
  }, [page]);

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className="container-bg-content">
        {loadingAppointments ? (
          <Loader />
        ) : errorAppointments ? (
          <Message variant="danger">{errorAppointments}</Message>
        ) : typeof countAppointments === "undefined" ||
          countAppointments === 0 ? (
          <Message variant="danger">Brak wyników</Message>
        ) : (
          <>
            <button
              className="btnRound bg-blue clr-white justify-self-end mx-4"
              style={{ justifySelf: "end" }}
            >
              Filtry
            </button>
            <AppointmentsTable appointments={appointments} type={type} />
          </>
        )}
      </div>
      {loadingAppointments ? null : (
        <div className="container-bg-pagination">
          <Pagination
            page={page}
            pageSize={pageSize}
            count={countAppointments}
            clickBack={handleClickBack}
            clickForward={handleClickForward}
          />
        </div>
      )}
    </>
  );
};

export default AppointmentList;
