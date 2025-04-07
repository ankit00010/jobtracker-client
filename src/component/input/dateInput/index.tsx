import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import "./style.css";

interface DateInputProps {
  labelName?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  labelName,
  value,
  onChange,
  className,
  error,
}) => {
  const inputId = labelName
    ? labelName.replace(/\s+/g, "-").toLowerCase()
    : "date-input";
  const datePickerRef = useRef<DatePicker>(null);

  return (
    <div className={`date-input-wrapper ${className || ""}`}>
      {labelName && (
        <label htmlFor={inputId} className="date-input-label">
          {labelName}
        </label>
      )}

      {/* Clicking anywhere inside this div will open the date picker */}
      <div
        className={`date-picker-container ${error ? "date-input-error" : ""}`}
        onClick={() => datePickerRef.current?.setOpen(true)}
      >
        <DatePicker
          ref={datePickerRef}
          id={inputId}
          selected={value ? new Date(value) : null}
          onChange={(date) =>
            date && onChange((date as Date).toLocaleDateString("en-CA"))
          } // Only date
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className={`date-input-field`}
          minDate={new Date(2025, 0, 1)}
          maxDate={new Date(2030, 11, 31)}
        />
        <SlCalender className="calendar-icon" />
      </div>

      {error && <p className="date-error-message">{error}</p>}
    </div>
  );
};

export default DateInput;
