import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import format from "date-fns/format";

import { listAppointments } from "../../actions/appointmentActions";
import { AppointmentsTable } from "../../components/appointment";
import { Loader, Message, Pagination } from "../../components/general";
import panel from "../../components/UserPanel.module.css";
import { APPOINTMENT_LIST_RESET } from "../../constants/appointmentConsts";

const AppointmentListScreen = ({ type, name }) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const params = {
    page: page,
    date: type === "today" ? format(new Date(), "yyyy-MM-dd") : "",
    status:
      type === "not_approved"
        ? "Oczekuje na potwierdzenie"
        : type === "upcoming"
        ? "Potwierdzona"
        : "",
  };

  const {
    appointments,
    loadingAppointments,
    countAppointments,
    errorAppointments,
  } = useSelector((state) => state.appointmentList);

  const dispatch = useDispatch();
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
    <section className="up-section">
      <div className="container container-bg">
        <div className="container-bg-content">
          <h2 className={panel.h2}>{name}</h2>
          {loadingAppointments ? (
            <Loader />
          ) : errorAppointments ? (
            <Message variant="danger">{errorAppointments}</Message>
          ) : countAppointments === 0 ||
            typeof countAppointments === "undefined" ? (
            <Message variant="danger">Brak wyników</Message>
          ) : (
            <>
              <button
                className="btnRound bg-blue clr-white mx-4"
                style={{ justifySelf: "end" }}
              >
                Filtry
              </button>
              <AppointmentsTable appointments={appointments} />
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
      </div>
    </section>
  );
};

export default AppointmentListScreen;
