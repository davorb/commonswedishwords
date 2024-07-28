import "./Button.css";

const Button = ({ onClick, children }) => {
  return (
    <div onClick={onClick} className="button">
      {children}
    </div>
  );
};

export default Button;
