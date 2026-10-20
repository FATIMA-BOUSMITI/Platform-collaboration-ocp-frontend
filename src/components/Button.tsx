import "./styles/Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ text,type = "button",onClick,disabled = false,}: ButtonProps) {
  return (
    <button
      className="primary-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
      <span className="button-arrow">→</span>
    </button>
  );
}

export default Button;