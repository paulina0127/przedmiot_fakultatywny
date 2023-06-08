import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import format from "date-fns/format";
import { Field, Form, Formik } from "formik";

import { listAppointments } from "../../actions/appointmentActions";
import { AppointmentsTable } from "../../components/appointment";
import { SelectField, TextField } from "../../components/formHelpers";
import { Loader, Message, Pagination } from "../../components/general";
import panel from "../../components/UserPanel.module.css";
import { APPOINTMENT_LIST_RESET } from "../../constants/appointmentConsts";

const AppointmentList = ({ doctorId, patientId, type }) => {
  const pageSize = 10;

  const [selectedStatus, setSelectedStatus] = useState(null);
  const status = [
    {
      value: "",
      label: "Wszystkie",
    },
    {
      value: "Oczekuje na potwierdzenie",
      label: "Oczekuje na potwierdzenie",
    },
    {
      value: "Potwierdzona",
      label: "Potwierdzona",
    },
    {
      value: "Odbyta",
      label: "Odbyta",
    },
    {
      value: "Anulowana",
      label: "Anulowana",
    },
  ];

  const {
    appointments,
    loadingAppointments,
    countAppointments,
    errorAppointments,
  } = useSelector((state) => state.appointmentList);

  const dispatch = useDispatch();

  const [params, setParams] = useState({
    page: 1,
    search: "",
    start_date: "",
    end_date: "",
    doctor: doctorId ? doctorId : "",
    patient: patientId ? patientId : "",
    ordering: "date",
  });

  const updateParams = (newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  useEffect(() => {
    dispatch(listAppointments(params));
    return () => {
      dispatch({ type: APPOINTMENT_LIST_RESET });
    };
  }, [params]);

  const handleClickBack = () => {
    updateParams({ page: params.page - 1 });
  };

  const handleClickForward = () => {
    updateParams({ page: params.page + 1 });
  };

  return (
    <>
      <div className="container-bg-content">
        {loadingAppointments ? null : (
          <div
            className="d-flex align-items-center"
            style={{ justifySelf: "end" }}
          >
            <Formik
              initialValues={{
                search: params.search,
                status: params.status,
                start_date: params.start_date,
                end_date: params.end_date,
              }}
              onSubmit={(values) => {
                updateParams({
                  page: 1,
                  search: values.search,
                  status: values.status,
                  start_date:
                    values.start_date &&
                    format(new Date(values.start_date), "yyyy-MM-dd"),
                  end_date:
                    values.end_date &&
                    format(new Date(values.end_date), "yyyy-MM-dd"),
                });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form id="filtersForm">
                  <div className="d-flex gap-4 align-items-center">
                    <TextField type="date" name="start_date" />
                    <p className="d-inline"> - </p>
                    <TextField type="date" name="end_date" />

                    <Field
                      name="status"
                      component={SelectField}
                      options={status}
                      value={selectedStatus}
                      placeholder="Wybierz status"
                      onChange={(option) => {
                        setFieldValue("status", option.value);
                        setSelectedStatus(option);
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
        {loadingAppointments ? (
          <Loader />
        ) : errorAppointments ? (
          <Message variant="danger">{errorAppointments}</Message>
        ) : typeof countAppointments === "undefined" ||
          countAppointments === 0 ? (
          <Message variant="danger">Brak wyników</Message>
        ) : (
          <AppointmentsTable appointments={appointments} type={type} />
        )}
      </div>
      {loadingAppointments ? null : (
        <div className="container-bg-pagination">
          <Pagination
            page={params.page}
            pageSize={pageSize}
            count={countAppointments}
            clickBack={handleClickBack}
            clickForward={handleClickForward}
          />
        </div>
      )}
    </>
  );
};

export default AppointmentList;
