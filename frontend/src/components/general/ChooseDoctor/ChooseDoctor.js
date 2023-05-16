import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listDoctors } from "../../../actions/doctorActions";
import { Loader, Message } from "../../../components/general";
import { DOCTOR_LIST_RESET } from "../../../constants/doctorConsts";
import panel from "../../UserPanel.module.css";
import DoctorInfo from "../DoctorInfo/DoctorInfo";

const ChooseDoctor = () => {
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, count, error } = doctorList;

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : count === 0 ? (
        <Message variant="danger">Brak wyników</Message>
      ) : (
        <div className="d-flex flex-column align-items-normal w-100 gap-5">
          <div className="twoColumnGrid">
            {doctors.slice(0, 2).map((doctor) => (
              <div className="gridCenter gap-2">
                <DoctorInfo key={doctor.id} doctor={doctor}>
                  <button className="btnRound bg-dark-blue clr-white">
                    Wybierz
                  </button>
                </DoctorInfo>
              </div>
            ))}
          </div>
          <div className="threeColumnGrid">
            {doctors.slice(2, 5).map((doctor) => (
              <div className="gridCenter gap-2">
                <DoctorInfo key={doctor.id} doctor={doctor}>
                  <button className="btnRound bg-dark-blue clr-white">
                    Wybierz
                  </button>
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
