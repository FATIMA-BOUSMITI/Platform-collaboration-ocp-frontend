import "./styles/Input.css";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({label,type = "text",placeholder,value, onChange,}: InputProps) {
    
  return (
    <div className="input-group">

      <label className="input-label">
        {label}
      </label>

      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>
  );
}

export default Input;