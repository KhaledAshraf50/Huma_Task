const Button = ({
  text,
  handleClick,
  variant = "primary",
  disabled = false,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case "danger":
        return "red";
      case "secondary":
        return "gray";
      default:
        return "blue";
    }
  };
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundColor: getBackgroundColor(),
        color: "#fff",
        padding: "8px 16px",
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {text}
    </button>
  );
};

export default Button;
