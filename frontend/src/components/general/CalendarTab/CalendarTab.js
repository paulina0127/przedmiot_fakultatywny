import "./CalendarTab.css";

const CalendarTab = ({ name, onClick, isSelected }) => {
  return (
    <button
      className={`${isSelected ? "bg-dark-blue clr-white " : ""}calendarTab`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CalendarTab;
