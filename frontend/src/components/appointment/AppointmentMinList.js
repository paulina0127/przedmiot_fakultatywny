import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AppointmentsTable } from ".";
import { listAppointments } from "../../actions/appointmentActions";
import { Loader, Message } from "../../components/general";
import { APPOINTMENT_LIST_RESET } from "../../constants/appointmentConsts";
import panel from "../UserPanel.module.css";

const AppointmentMinList = ({ appointType, type, name }) => {
  const {
    appointments,
    loadingAppointments,
    countAppointments,
    errorAppointments,
  } = useSelector((state) => state.appointmentList);

  const dispatch = useDispatch();
  useEffect(() => {
    if(appointType === 'today') {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      dispatch(listAppointments({ page_size: 3, date: formattedDate }));
    } else if (appointType === 'not_approved')
      dispatch(listAppointments({ page_size: 3, status: 'Oczekuje na potwierdzenie' }));
    return () => {
      dispatch({ type: APPOINTMENT_LIST_RESET });
    };
  }, []);

  return (
    <div className="main-container-bg" id="dzisiejsze_wizyty">
      <h2 className={panel.h2}>{name}</h2>
      {loadingAppointments? (
        <Loader />
      ) : errorAppointments ? (
        <Message variant="danger">{errorAppointments}</Message>
      ) : countAppointments === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <>
          <AppointmentsTable 
            appointments={appointments} 
            type={type}
            min={true}
            to_approve={appointType === 'not_approved' ? true : false}
          />
          <Link to="/URL" className="align-self-center">
            <button className="btnRound bg-dark-blue clr-white">
              Pokaż wszystkie
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default AppointmentMinList