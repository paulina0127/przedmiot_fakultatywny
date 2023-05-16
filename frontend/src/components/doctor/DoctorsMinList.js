import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Doctors } from ".";
import { listDoctors } from "../../actions/doctorActions";
import { Loader, Message } from "../../components/general";
import { DOCTOR_LIST_RESET } from "../../constants/doctorConsts";
import panel from "../UserPanel.module.css";

function DoctorsMinList() {
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, count, error } = doctorList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors({ page_size: 3 }));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
    };
  }, []);

  return (
    <div className="main-container-bg" id="doctors">
      <h2 className={panel.h2}>Lekarze</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : count === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <>
          <Doctors doctors={doctors} />

          <Link to="/lekarze" className="align-self-center">
            <button className="btnRound bg-dark-blue clr-white">
              Pokaż wszystkie
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default DoctorsMinList;
