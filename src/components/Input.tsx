import type { ReactNode } from "react";
import "./styles/Input.css";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: ReactNode;
}

function Input({label,type = "text",placeholder,value, onChange,rightIcon}: InputProps) {
    
  return (
    <div className="input-group">
  <label className="input-label">{label}</label>

  <div className="input-container">
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
</div>
  );
}

export default Input;