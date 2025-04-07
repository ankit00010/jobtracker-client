import React from "react";
import "./style.css";
import { IoMdArrowDropdown } from "react-icons/io";

interface DropDownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (selectedString: string) => void;
  style?: string;
  isLabel?: boolean;
}

const DropDownInput: React.FC<DropDownProps> = ({
  label,
  options,
  value,
  onChange,
  style,
  isLabel = true,
}) => {
  return (
    <div className="dropdown-container">
      {isLabel && <label className="dropdown-label">{label}</label>}

      <div className={`dropdown-wrapper ${style}`}>
        <select
          className="dropdown-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {label}
          </option>

          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        
        <IoMdArrowDropdown className="dropdown-icon" />
      </div>
    </div>
  );
};

export default DropDownInput;
