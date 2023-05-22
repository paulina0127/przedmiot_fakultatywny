import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { PatientsTable } from ".";
import { listPatients } from "../../actions/patientActions";
import { Loader, Message } from "../../components/general";
import { PATIENT_LIST_RESET } from "../../constants/patientConsts";
import panel from "../UserPanel.module.css";

const PatientsMinList = () => {
  const patientList = useSelector((state) => state.patientList);
  const { patients, loadingPatients, countPatients, errorPatients } =
    patientList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listPatients({ page_size: 3 }));
    return () => {
      dispatch({ type: PATIENT_LIST_RESET });
    };
  }, []);

  return (
    <div className="main-container-bg" id="pacjenci">
      <h2 className={panel.h2}>Pacjenci</h2>
      {loadingPatients ? (
        <Loader />
      ) : errorPatients ? (
        <Message variant="danger">{errorPatients}</Message>
      ) : typeof countPatients === "undefined" || countPatients === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <>
          <PatientsTable patients={patients} min />

          <Link to="/pacjenci" className="align-self-center">
            <button className="btnRound bg-dark-blue clr-white">
              Pokaż wszystkie
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default PatientsMinList;
