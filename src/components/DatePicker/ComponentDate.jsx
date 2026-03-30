import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { registerLocale } from "react-datepicker";
import { useEffect, useState } from "react";
import useDateStore from "../../store/CalendarStore";
import { format } from "date-fns";

registerLocale("ru", ru);

export default function ComponentDate() {
  const { dates, addDate, removeDate } = useDateStore();
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMouth, setCurrentMonth] = useState(new Date());

  // Обновление store
  useEffect(() => {
    setSelectedDates(dates);
    setCurrentMonth(new Date());
  }, [dates]);

  const handleDateChange = (selectedDate) => {
    const isDateSelected = selectedDates.some(
      (d) => d.getTime() === selectedDate.getTime()
    );
    if (isDateSelected) {
      removeDate(selectedDate);
    } else {
      addDate(selectedDate);
    }
  };

  return (
    <div id="main-date-picker" className="date-wrapper">
      <DatePicker
        // showIcon
        toggleCalendarOnIconClick
        selected={null}
        onChange={handleDateChange}
        dateFormat="MM YYYY"
        locale="ru"
        shouldCloseOnSelect={false}
        withPortal
        highlightDates={selectedDates.map((date) => new Date(date))}
        isClearable
        className="date-wrapper-input"
      />

      <div className="date-wrapper__info">
        <div>
          <p className="month">
            {dates[0]
              ? format(dates[0], "LLL", { locale: ru })
              : format(currentMouth, "LLLL", { locale: ru })}
          </p>
        </div>

        <div>
          <p className="year">
            {format(currentMouth, "yyyy", { locale: ru })}г
          </p>
        </div>
      </div>
    </div>
  );
}
