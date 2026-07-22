import "./styles/Button.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

function Button({
  text,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      className="primary-button"
      type={type}
      onClick={onClick}
    >
      {text}
      <span className="button-arrow">→</span>
    </button>
  );
}

export default Button;