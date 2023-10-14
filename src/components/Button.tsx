import "../styles/Button.css";

interface Props {
  onClick: () => void,
  disabled?: boolean,
  customClass?: string,
  children?: React.ReactNode,
}

export default function Button({
  onClick,
  disabled,
  customClass,
  children,
}: Props) {
  let className = "basic-button";
  if (customClass) className += " " + customClass;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}