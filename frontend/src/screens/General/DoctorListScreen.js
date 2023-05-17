import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { listDoctors } from "../../actions/doctorActions";
import { DoctorsTable } from "../../components/doctor";
import { Loader, Message, Pagination } from "../../components/general";
import panel from "../../components/UserPanel.module.css";
import { DOCTOR_LIST_RESET } from "../../constants/doctorConsts";

const DoctorListScreen = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, count, error } = doctorList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listDoctors({ page: page }));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
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
          <h2 className={panel.h2}>Lekarze</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : count === 0 || typeof count === "undefined" ? (
            <Message variant="danger">Brak wyników</Message>
          ) : (
            <>
              <button
                className="btnRound bg-blue clr-white mx-4"
                style={{ justifySelf: "end" }}
              >
                Filtry
              </button>
              <DoctorsTable doctors={doctors} />
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

export default DoctorListScreen;
