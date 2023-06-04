import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { DoctorsTable } from ".";
import { listDoctors } from "../../actions/doctorActions";
import { Loader, Message } from "../../components/general";
import { DOCTOR_LIST_RESET } from "../../constants/doctorConsts";
import panel from "../UserPanel.module.css";

const DoctorsMinList = () => {
  const { doctors, loadingDoctors, countDoctors, errorDoctors } = useSelector(
    (state) => state.doctorList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors({ page_size: 5 }));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
    };
  }, []);

  return (
    <div className="main-container-bg" id="lekarze">
      <h2 className={panel.h2}>Lekarze</h2>
      {loadingDoctors ? (
        <Loader />
      ) : errorDoctors ? (
        <Message variant="danger">{errorDoctors}</Message>
      ) : countDoctors === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <>
          <DoctorsTable doctors={doctors} />

          <Link to="/lekarze" className="align-self-center">
            <button className="btnRound bg-dark-blue clr-white">
              Pokaż wszystkie
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DoctorsMinList;
