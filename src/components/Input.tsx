import type { ReactNode } from "react";
import "./styles/Input.css";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: ReactNode;
}

function Input({
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  rightIcon
}: InputProps) {
    
  return (
    <div className="input-group">

      <label className="input-label">
        {label}
      </label>

      <div className={`input-container ${error ? "has-error" : ""}`}>

        <input
          className="input-field"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {rightIcon && (
          <div className="input-icon">
            {rightIcon}
          </div>
        )}

      </div>

      {error && (
        <span className="error-message">
          Ce champ est obligatoire
        </span>
      )}

    </div>
  );
}

export default Input;