import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listPatients } from "../../actions/patientActions";
import { Loader, Message, Pagination } from "../../components/general";
import { PatientsTable } from "../../components/patient";
import panel from "../../components/UserPanel.module.css";
import { PATIENT_LIST_RESET } from "../../constants/patientConsts";

const PatientListScreen = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { patients, loadingPatients, countPatients, errorPatients } =
    useSelector((state) => state.patientList);

  const dispatch = useDispatch();

  const params = {
    page: page,
  };

  useEffect(() => {
    dispatch(listPatients(params));
    return () => {
      dispatch({ type: PATIENT_LIST_RESET });
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
          <h2 className={panel.h2}>Pacjenci</h2>
          {loadingPatients ? (
            <Loader />
          ) : errorPatients ? (
            <Message variant="danger">{errorPatients}</Message>
          ) : countPatients === 0 || typeof countPatients === "undefined" ? (
            <Message variant="danger">Brak wyników</Message>
          ) : (
            <>
              <button
                className="btnRound bg-blue clr-white justify-self-end mx-4"
                style={{ justifySelf: "end" }}
              >
                Filtry
              </button>
              <PatientsTable patients={patients} />
            </>
          )}
        </div>
        {loadingPatients ? null : (
          <div className="container-bg-pagination">
            <Pagination
              page={page}
              pageSize={pageSize}
              count={countPatients}
              clickBack={handleClickBack}
              clickForward={handleClickForward}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientListScreen;
