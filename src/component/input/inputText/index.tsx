import React from "react";
import "./style.css";

interface InputProps {
  labelName?: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  className?: string;
  error?: string; // Error message prop
  arialLabel: string;
}

const Input: React.FC<InputProps> = ({
  labelName,
  value,
  onChange,
  type,
  className,
  error,
  arialLabel,
}) => {
  return (
    <div className={`input-wrapper ${className || ""}`.trim()}>
      <label htmlFor={labelName || ""} className="input-label">
        {labelName}
      </label>

      {type === "textarea" ? (
        <textarea
          id={labelName}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`input-field text-area ${error ? "input-error" : ""}`}
          aria-label={`${arialLabel}`}
        />
      ) : (
        <input
          id={labelName}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`input-field ${error ? "input-error" : ""}`}
          aria-label={`${arialLabel}`}
          inputMode={type === "password" ? "none" : "text"}
        />
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
