import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Field, Form, Formik } from "formik";

import { listDoctors, listSpecializations } from "../../actions/doctorActions";
import { DoctorsTable } from "../../components/doctor";
import { SelectField, TextField } from "../../components/formHelpers";
import { Loader, Message, Pagination } from "../../components/general";
import panel from "../../components/UserPanel.module.css";
import {
  DOCTOR_LIST_RESET,
  SPECIALIZATION_LIST_RESET,
} from "../../constants/doctorConsts";

const DoctorListScreen = () => {
  const dispatch = useDispatch();
  const pageSize = 10;

  const { doctors, loadingDoctors, countDoctors, errorDoctors } = useSelector(
    (state) => state.doctorList
  );
  const {
    specializations,
    loadingSpecializations,
    countSpecializations,
    errorSpecializations,
  } = useSelector((state) => state.specializationList);

  const [selectedSpec, setSelectedSpec] = useState(null);
  const specs = specializations?.map((specialization) => ({
    value: specialization.id.toString(),
    label: specialization.name,
  }));

  const [params, setParams] = useState({
    page: 1,
    search: "",
    specializations: "",
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
    dispatch(listDoctors(params));
    return () => {
      dispatch({ type: DOCTOR_LIST_RESET });
    };
  }, [params]);

  useEffect(() => {
    dispatch(listSpecializations());
    return () => {
      dispatch({ type: SPECIALIZATION_LIST_RESET });
    };
  }, []);

  return (
    <section className="up-section">
      <div className="container container-bg">
        <div className="container-bg-content">
          <h2 className={panel.h2}>Lekarze</h2>
          {loadingDoctors ? null : (
            <div
              className="d-flex align-items-center"
              style={{ justifySelf: "end" }}
            >
              <Formik
                initialValues={{ search: params.search }}
                onSubmit={(values) => {
                  updateParams({
                    page: 1,
                    search: values.search,
                    specializations: values.specializations
                      ? values.specializations
                      : "",
                  });
                }}
              >
                {({ values, setFieldValue }) => (
                  <Form id="filtersForm">
                    <div className="d-flex gap-4">
                      <Field
                        name="specializations"
                        component={SelectField}
                        options={specs}
                        value={selectedSpec}
                        isSearchable={true}
                        placeholder="Wybierz specializację"
                        onChange={(option) => {
                          setFieldValue("specializations", option.value);
                          setSelectedSpec(option);
                        }}
                      />
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
          {loadingDoctors ? (
            <Loader />
          ) : errorDoctors ? (
            <Message variant="danger">{errorDoctors}</Message>
          ) : countDoctors === 0 || typeof countDoctors === "undefined" ? (
            <Message variant="danger">Brak wyników</Message>
          ) : (
            <DoctorsTable doctors={doctors} />
          )}
        </div>
        {loadingDoctors ? null : (
          <div className="container-bg-pagination">
            <Pagination
              page={params.page}
              pageSize={pageSize}
              count={countDoctors}
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
