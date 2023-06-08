import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form, Formik } from "formik";

import { listPatients } from "../../actions/patientActions";
import { TextField } from "../../components/formHelpers";
import { Loader, Message, Pagination } from "../../components/general";
import { PatientsTable } from "../../components/patient";
import panel from "../../components/UserPanel.module.css";
import { PATIENT_LIST_RESET } from "../../constants/patientConsts";

const PatientListScreen = () => {
  const dispatch = useDispatch();
  const pageSize = 10;

  const { patients, loadingPatients, countPatients, errorPatients } =
    useSelector((state) => state.patientList);

  const [params, setParams] = useState({
    page: 1,
    search: "",
  });

  const updateParams = (newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const handleClickBack = () => {
    updateParams({ page: params.page - 1 });
  };

  const handleClickForward = () => {
    updateParams({ page: params.page + 1 });
  };

  useEffect(() => {
    dispatch(listPatients(params));
    return () => {
      dispatch({ type: PATIENT_LIST_RESET });
    };
  }, [params]);

  return (
    <section className="up-section">
      <div className="container container-bg">
        <div className="container-bg-content">
          <h2 className={panel.h2}>Pacjenci</h2>
          {loadingPatients ? null : (
            <div
              className="d-flex align-items-center"
              style={{ justifySelf: "end" }}
            >
              <Formik
                initialValues={{ search: params.search }}
                onSubmit={(values) => {
                  updateParams({ page: 1, search: values.search });
                }}
              >
                {({ values }) => (
                  <Form id="filtersForm">
                    <div className="d-flex gap-2">
                      <TextField
                        name="search"
                        type="search"
                        placeholder="Wyszukiwarka"
                      />
                    </div>
                  </Form>
                )}
              </Formik>
              <button
                type="submit"
                form="filtersForm"
                className="btnRound bg-blue clr-white justify-self-end mx-4"
              >
                Filtruj
              </button>
            </div>
          )}
          {loadingPatients ? (
            <Loader />
          ) : errorPatients ? (
            <Message variant="danger">{errorPatients}</Message>
          ) : countPatients === 0 || typeof countPatients === "undefined" ? (
            <Message variant="danger">Brak wyników</Message>
          ) : (
            <PatientsTable patients={patients} />
          )}
        </div>
        {loadingPatients ? null : (
          <div className="container-bg-pagination">
            <Pagination
              page={params.page}
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
