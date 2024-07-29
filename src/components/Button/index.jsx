import "./Button.css";

const Button = ({ onClick, children, tooltip }) => {
  return (
    <div
      onClick={onClick}
      className="button tooltip-bottom"
      data-tooltip={tooltip}
    >
      {children}
    </div>
  );
};

export default Button;
