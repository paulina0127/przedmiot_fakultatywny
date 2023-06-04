import { useEffect, useState } from "react";
import {
  BsFillCalendarCheckFill,
  BsFillCalendarFill,
  BsFillCalendarXFill,
  BsFillPeopleFill,
  BsFillPersonPlusFill,
} from "react-icons/bs";
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

import {
  listAppointmentStats,
  listPatientStats,
} from "../../actions/statsAndSlotsActions";
import {
  APPOINTMENT_STATS_RESET,
  PATIENT_STATS_RESET,
} from "../../constants/statsAndSlotsConsts";
import { Loader, Message } from "../general";
import panel from "../UserPanel.module.css";
import "./Statistics.css";

const Statistics = ({ screen }) => {
  const dispatch = useDispatch();
  const { patientStats, loadingPatientStats, errorPatientStats } = useSelector(
    (state) => state.patientStats
  );
  const { appointmentStats, loadingAppointmentStats, errorAppointmentStats } =
    useSelector((state) => state.appointmentStats);

  const [selectedTime, setSelectedTime] = useState("Dzisiaj");
  const [dates, setDates] = useState([new Date(), new Date()]);

  const handleTabClick = (name) => {
    setSelectedTime(name);
    if (name === "Dzisiaj") setDates([new Date(), new Date()]);
    else if (name === "W tym tygodniu")
      setDates([startOfWeek(new Date()), endOfWeek(new Date())]);
    else if (name === "W tym miesiącu")
      setDates([startOfMonth(new Date()), endOfMonth(new Date())]);
    else if (name === "W tym roku")
      setDates([startOfYear(new Date()), endOfYear(new Date())]);
    else if (name === "Wszystkie") setDates(["", ""]);
  };

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    setDates([new Date(startDate), dates[1]]);
  };

  const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    setDates([dates[0], new Date(endDate)]);
  };

  const params = {
    start_date: dates[0] && format(dates[0], "yyyy-MM-dd"),
    end_date: dates[1] && format(dates[1], "yyyy-MM-dd"),
  };

  useEffect(() => {
    dispatch(listPatientStats(params));
    dispatch(listAppointmentStats(params));
    return () => {
      dispatch({ type: PATIENT_STATS_RESET });
      dispatch({ type: APPOINTMENT_STATS_RESET });
    };
  }, [dates]);

  const DatesCont = () => {
    return (
      <>
        <div className="timesContainer">
          <div
            className={`time ${
              selectedTime == "Dzisiaj" && "bg-dark-blue clr-white"
            }`}
            onClick={() => handleTabClick("Dzisiaj")}
          >
            Dzień
          </div>
          <div
            className={`time ${
              selectedTime == "W tym tygodniu" && "bg-dark-blue clr-white"
            }`}
            onClick={() => handleTabClick("W tym tygodniu")}
          >
            Tydzień
          </div>
          <div
            className={`time ${
              selectedTime == "W tym miesiącu" && "bg-dark-blue clr-white"
            }`}
            onClick={() => handleTabClick("W tym miesiącu")}
          >
            Miesiąc
          </div>
          <div
            className={`time ${
              selectedTime == "W tym roku" && "bg-dark-blue clr-white"
            }`}
            onClick={() => handleTabClick("W tym roku")}
          >
            Rok
          </div>
          <div
            className={`time ${
              selectedTime == "Wszystkie" && "bg-dark-blue clr-white"
            }`}
            onClick={() => handleTabClick("Wszystkie")}
          >
            Wszystkie
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
          <h3 className={`${panel.h3}`}>Wybrany okres:</h3>
          <div className="mb-2">
            <input
              type="date"
              name="start_date"
              value={dates[0] && format(dates[0], "yyyy-MM-dd")}
              onChange={handleStartDateChange}
              className="border-0"
              style={{ width: "120px" }}
            />
            <p className="d-inline"> - </p>
            <input
              type="date"
              name="end_date"
              value={dates[1] && format(dates[1], "yyyy-MM-dd")}
              onChange={handleEndDateChange}
              className="border-0"
              style={{ width: "120px" }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h2 className={panel.h2}>Statystyki</h2>
      <div className="fiveColumnGrid my-4">
        {loadingPatientStats ? (
          <Loader style={{ gridColumn: "span 2" }} />
        ) : errorPatientStats ? (
          <Message variant="danger" style={{ gridColumn: "span 2" }}>
            {errorPatientStats}
          </Message>
        ) : typeof patientStats === "undefined" || patientStats.length === 0 ? (
          <Message variant="danger" style={{ gridColumn: "span 2" }}>
            Brak wyników
          </Message>
        ) : (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <BsFillPeopleFill size="2.5rem" className="clr-blue" />
              <h5 className="fw-bold">Wszyscy pacjenci</h5>
              <h2 className={panel.h2}>{patientStats.all}</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <BsFillPersonPlusFill size="2.5rem" className="clr-blue" />
              <h5 className="fw-bold">Nowi pacjenci</h5>
              <h2 className={panel.h2}>{patientStats.new}</h2>
            </div>
          </>
        )}
        {loadingAppointmentStats ? (
          <Loader style={{ gridColumn: "span 3" }} />
        ) : errorAppointmentStats ? (
          <Message variant="danger" style={{ gridColumn: "span 3" }}>
            {errorAppointmentStats}
          </Message>
        ) : typeof appointmentStats === "undefined" ||
          appointmentStats.length === 0 ? (
          <Message variant="danger" style={{ gridColumn: "span 3" }}>
            Brak wyników
          </Message>
        ) : (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <BsFillCalendarFill size="2.5rem" className="clr-blue" />
              <h5 className="fw-bold">Wszystkie wizyty</h5>
              <h2 className={panel.h2}>{appointmentStats.all}</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <BsFillCalendarCheckFill size="2.5rem" className="clr-blue" />
              <h5 className="fw-bold">Odbyte wizyty</h5>
              <h2 className={panel.h2}>{appointmentStats.completed}</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <BsFillCalendarXFill size="2.5rem" className="clr-blue" />
              <h5 className="fw-bold">Anulowane wizyty</h5>
              <h2 className={panel.h2}>{appointmentStats.cancelled}</h2>
            </div>
          </>
        )}
      </div>
      {screen ? (
        <div className="container-bg-pagination flex-column align-items-center">
          <DatesCont />
        </div>
      ) : (
        <DatesCont />
      )}
    </>
  );
};

export default Statistics;
