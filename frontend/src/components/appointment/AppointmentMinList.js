import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";

import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import format from "date-fns/format";

import { AppointmentsTable } from ".";
import { listAppointments } from "../../actions/appointmentActions";
import {
  CalendarTab,
  Loader,
  Message,
  Pagination,
} from "../../components/general";
import { APPOINTMENT_LIST_RESET } from "../../constants/appointmentConsts";
import panel from "../UserPanel.module.css";
import "./Calendar.css";

const AppointmentMinList = ({ type }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [selectedTab, setSelectedTab] = useState("Dzisiaj");

  const params = {
    page_size: pageSize,
    page: page,
    status: "",
    start_date:
      selectedDates[0] && format(new Date(selectedDates[0]), "yyyy-MM-dd"),
    end_date:
      selectedDates[1] && format(new Date(selectedDates[1]), "yyyy-MM-dd"),
    ordering: "date",
  };

  const handleSelect = (value) => {
    if (value[0] === null) value[0] = "";
    else if (value[1] === null) value[1] = value[0];

    setSelectedDates(value);
  };

  const handleTabClick = (name) => {
    setSelectedTab(name);
    if (name === "Dzisiaj") setSelectedDates([new Date(), new Date()]);
    else if (name === "W tym tygodniu")
      setSelectedDates([startOfWeek(new Date()), endOfWeek(new Date())]);
    else if (name === "W tym miesiącu")
      setSelectedDates([startOfMonth(new Date()), endOfMonth(new Date())]);
    else if (name === "W tym roku")
      setSelectedDates([startOfYear(new Date()), endOfYear(new Date())]);
    else if (name === "Wszystkie") setSelectedDates(["", ""]);
  };

  const {
    appointments,
    loadingAppointments,
    countAppointments,
    errorAppointments,
  } = useSelector((state) => state.appointmentList);

  useEffect(() => {
    dispatch(listAppointments(params));
    return () => {
      dispatch({ type: APPOINTMENT_LIST_RESET });
    };
  }, [page, selectedDates]);

  useEffect(() => {
    setPage(1);
  }, [selectedDates]);

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  return (
    <div className="main-container-bg gridSpanCol">
      <h2 className={panel.h2}>Wizyty</h2>
      <div className="aptList">
        <div className="d-flex flex-column justify-content-center">
          <div className="calendarWithTabs">
            <div className="calendarTabsContainer">
              <CalendarTab
                name="Dzisiaj"
                isSelected={selectedTab === "Dzisiaj"}
                onClick={() => handleTabClick("Dzisiaj")}
              />
              <CalendarTab
                name="W tym tygodniu"
                isSelected={selectedTab === "W tym tygodniu"}
                onClick={() => handleTabClick("W tym tygodniu")}
              />
              <CalendarTab
                name="W tym miesiącu"
                isSelected={selectedTab === "W tym miesiącu"}
                onClick={() => handleTabClick("W tym miesiącu")}
              />
              <CalendarTab
                name="W tym roku"
                isSelected={selectedTab === "W tym roku"}
                onClick={() => handleTabClick("W tym roku")}
              />
              <CalendarTab
                name="Wszystkie"
                isSelected={selectedTab === "Wszystkie"}
                onClick={() => handleTabClick("Wszystkie")}
              />
            </div>
            <div className="calendarContainer">
              <Calendar
                activeStartDate={new Date()}
                selectRange={true}
                allowPartialRange={true}
                value={selectedDates}
                onChange={handleSelect}
              />
            </div>
          </div>
          {(selectedDates[0] || selectedDates[1]) && (
            <div className="d-flex mt-3 gap-2 justify-content-center">
              <h3 className={panel.h3}>Wybrany okres:</h3>
              <p>
                {selectedDates[0]
                  ? `${format(selectedDates[0], "dd-MM-yyyy")}`
                  : ""}
                {selectedDates[1]
                  ? ` - ${format(selectedDates[1], "dd-MM-yyyy")}`
                  : ""}
              </p>
            </div>
          )}
        </div>
        {loadingAppointments ? (
          <Loader />
        ) : errorAppointments ? (
          <Message variant="danger">{errorAppointments}</Message>
        ) : countAppointments === 0 ? (
          <Message variant="danger" style={{ height: "fit-content" }}>
            Brak wyników
          </Message>
        ) : (
          <AppointmentsTable
            appointments={appointments}
            type={type}
            min={true}
          />
        )}
      </div>

      <div className="container-bg-pagination">
        <Pagination
          page={page}
          pageSize={pageSize}
          count={countAppointments}
          clickBack={handleClickBack}
          clickForward={handleClickForward}
        />
      </div>
    </div>
  );
};

export default AppointmentMinList;
