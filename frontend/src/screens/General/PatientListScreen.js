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

  const patientList = useSelector((state) => state.patientList);
  const { patients, loading, count, error } = patientList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listPatients({ page: page }));
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

  console.log(count);

  return (
    <section className="up-section">
      <div className="container container-bg">
        <div className="container-bg-content">
          <h2 className={panel.h2}>Pacjenci</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : count === 0 || typeof count === "undefined" ? (
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
        {loading ? null : (
          <div className="container-bg-pagination">
            <Pagination
              page={page}
              pageSize={pageSize}
              count={count}
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
