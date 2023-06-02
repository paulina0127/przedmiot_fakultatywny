import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppointmentModalInfo } from ".";
import { updateAppointment } from "../../actions/appointmentActions";
import { BiDetail } from "react-icons/bi";
import { BsXSquare, BsCheckSquare} from "react-icons/bs";
import { Link } from "react-router-dom";
import { Row, Table, MyModal } from "../general";

const AppointmentsTable = ({ appointments, min, type, to_approve }) => {
  const headers =
    type === "Pacjent"
      ? min
        ? ["Data", "Godzina", "Lekarz", "Szczegóły"]
        : ["Data", "Godzina", "Lekarz", "Status", "Szczegóły"]
      : type === "Lekarz"
      ? min
        ? ["Data", "Godzina", "Pacjent", "Szczegóły"]
        : ["Data", "Godzina", "Pacjent", "Status", "Szczegóły"]
      : min
      ? ["Data", "Godzina", "Lekarz", "Pacjent", "Szczegóły"]
      : ["Data", "Godzina", "Lekarz", "Pacjent", "Status", "Szczegóły"];

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
  const [changeAppointStatus, setAppointStatus] = useState(false)
  const [statusType, setStatusType] = useState('')

  const handleShowModal = (type) => {
    setAppointStatus(true)
    setStatusType(type)
  }
  const handleCloseModal = () => setAppointStatus(false)

  const dispatch = useDispatch()
  const changeStatusAppointmentHandler = (id, type) => {
    const value = { status: '' }
    if (type === 'accept') {
      value.status = 'Potwierdzona'
    } else if (type === 'reject') {
      value.status = 'Anulowana'
    }
    dispatch(updateAppointment(id, value))
    window.location.reload();
    setAppointStatus(false)
  }

  return (
    <Table headers={headers}>
      {appointments?.map((appointment, index) => (
        <Row key={index} number={index} object={appointment} values={values}>
          {!to_approve ? 
            <Link to={`/wizyty/${appointment?.id}`}>
              <BiDetail size="2rem" />
            </Link>
          : 
            <>
              <Link>
                <BsCheckSquare 
                  size="2rem" 
                  style={{marginRight: '10px'}}
                  onClick={() => handleShowModal('accept')}
                /> 
              </Link>
              <Link>
                <BsXSquare 
                  size="2rem" 
                  onClick={() => handleShowModal('reject')}
                /> 
              </Link>
              {changeAppointStatus && (
                <MyModal
                  showModal={true}
                  title={
                    statusType === 'accept'
                      ? 'Akceptowanie wizyty'
                      : 'Odrzucanie wizyty'
                  } 
                  danger={statusType === 'reject' ? true : 'accept'}
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
          }
        </Row>
      ))}
    </Table>
  );
};

export default AppointmentsTable;
