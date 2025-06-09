import "./Calendar.css";
import CalendarPart from "./components/CalendarPart";

const Calendar: React.FC = () => {
  return (
    <div className="calendar-page-container">
      <div className="calendar-page-contnet">
        <div className="calendar-part-container">
          <CalendarPart />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
