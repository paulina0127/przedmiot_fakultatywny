import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listDoctors } from "../../../actions/doctorActions";
import { Loader, Message } from "../../../components/general";
import { DOCTOR_LIST_RESET } from "../../../constants/doctorConsts";
import panel from "../../UserPanel.module.css";
import DoctorInfo from "../DoctorInfo/DoctorInfo";

const ChooseDoctor = () => {
  const { doctors, loadingDoctors, countDoctors, errorDoctors } = useSelector(
    (state) => state.doctorList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors({}));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
    };
  }, []);

  return (
    <div className="main-container-bg gridSpanCol">
      <h2 className={panel.h2}>Umów się na wizytę</h2>
      {loadingDoctors ? (
        <Loader />
      ) : errorDoctors ? (
        <Message variant="danger">{errorDoctors}</Message>
      ) : typeof countDoctors === "undefined" || countDoctors === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <div className="d-flex flex-column align-items-normal w-100 gap-5">
          <div
            className="fiveColumnGrid"
          >
            {doctors?.map((doctor) => (
              <div key={doctor.id} className="gridCenter gap-2">
                <DoctorInfo doctor={doctor}>
                  <Link to={`/nowa-wizyta/${doctor?.id}`}>
                    <button className="btnRound bg-dark-blue clr-white">
                      Wybierz
                    </button>
                  </Link>
                </DoctorInfo>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChooseDoctor;
