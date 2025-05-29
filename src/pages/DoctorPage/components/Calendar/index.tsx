import "./Calendar.css";
import calendarBlueIcon from "../../Icons/calendarBlue.png";
import CalendarPart from "./components/CalendarPart";

const Calendar: React.FC = () => {
    return (
        <div className="calendar-page-container">
            <div className="calendar-page-contnet">
                    <div className="calendarPage-title">
                        <img src={calendarBlueIcon} alt="Calendar icon" />
                        <span>Calendar</span>
                    </div>
                    <div className="calendar-part-container">
                        <CalendarPart />
                    </div>
            </div>
        </div>
    )
};

export default Calendar;
