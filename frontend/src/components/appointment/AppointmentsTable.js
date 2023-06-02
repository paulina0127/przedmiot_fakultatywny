import { useState } from "react";
import { AiFillProfile } from "react-icons/ai";
import { BsCheckSquareFill, BsXSquareFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { AppointmentModalInfo } from ".";
import { updateAppointment } from "../../actions/appointmentActions";
import { MyModal, Row, Table } from "../general";

const AppointmentsTable = ({ appointments, min, type }) => {
  const headers =
    type === "Pacjent"
      ? min
        ? ["Data", "Godzina", "Lekarz", "Akcje"]
        : ["Data", "Godzina", "Lekarz", "Status", "Akcje"]
      : type === "Lekarz"
      ? min
        ? ["Data", "Godzina", "Pacjent", "Szczegóły"]
        : ["Data", "Godzina", "Pacjent", "Status", "Szczegóły"]
      : min
      ? ["Data", "Godzina", "Lekarz", "Pacjent", "Akcje"]
      : ["Data", "Godzina", "Lekarz", "Pacjent", "Status", "Akcje"];

  const values =
    type === "Pacjent"
      ? min
        ? ["date", "time", "doctor"]
        : ["date", "time", "doctor", "status"]
      : type === "Lekarz"
      ? min
        ? ["date", "time", "patient"]
        : ["date", "time", "patient", "status"]
      : min
      ? ["date", "time", "doctor", "patient"]
      : ["date", "time", "doctor", "patient", "status"];

  // appointments to approve modal and action
  const [changeAppointStatus, setAppointStatus] = useState(false);
  const [statusType, setStatusType] = useState("");

  const handleShowModal = (type) => {
    setAppointStatus(true);
    setStatusType(type);
  };
  const handleCloseModal = () => setAppointStatus(false);

  const dispatch = useDispatch();
  const changeStatusAppointmentHandler = (id, type) => {
    const value = { status: "" };
    if (type === "accept") {
      value.status = "Potwierdzona";
    } else if (type === "reject") {
      value.status = "Anulowana";
    }
    dispatch(updateAppointment(id, value));
    window.location.reload();
    setAppointStatus(false);
  };

  return (
    <Table headers={headers}>
      {appointments?.map((appointment, index) => (
        <Row key={index} number={index} object={appointment} values={values}>
          {appointment.status !== "Oczekuje na potwierdzenie" ? (
            <Link to={`/wizyty/${appointment?.id}`} className="svgLink">
              <AiFillProfile size="2.5rem" />
            </Link>
          ) : (
            <>
              <Link className="svgLink">
                <BsCheckSquareFill
                  size="2rem"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleShowModal("accept")}
                />
              </Link>
              <Link className="svgLink">
                <BsXSquareFill
                  size="2rem"
                  style={{ marginRight: "10px" }}
                  onClick={() => handleShowModal("reject")}
                />
              </Link>
              <Link to={`/wizyty/${appointment?.id}`} className="svgLink">
                <AiFillProfile size="2.5rem" />
              </Link>
              {changeAppointStatus && (
                <MyModal
                  showModal={true}
                  title={
                    statusType === "accept"
                      ? "Akceptowanie wizyty"
                      : "Odrzucanie wizyty"
                  }
                  danger={statusType === "reject" ? true : "accept"}
                >
                  <AppointmentModalInfo
                    type={statusType}
                    handleCloseModal={handleCloseModal}
                    handleChangeStatus={changeStatusAppointmentHandler}
                    id={appointment?.id}
                  />
                </MyModal>
              )}
            </>
          )}
        </Row>
      ))}
    </Table>
  );
};

export default AppointmentsTable;
