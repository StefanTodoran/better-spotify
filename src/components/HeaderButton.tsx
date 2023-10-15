import { useNavigate } from "react-router-dom";
import Button, { ButtonProps } from "./Button";

interface Props extends Omit<ButtonProps, "onClick"> {
  displayPath: string,
  iconSrc?: string,
}

export default function HeaderButton({ displayPath, iconSrc, ...props }: Props) {
  const navigate = useNavigate();
  const navigatePath = "/" + displayPath.toLowerCase().replace(/\s/g, "");

  return (
    <Button {...props} onClick={() => {
      navigate(navigatePath);
    }}>
      {iconSrc && <img src={iconSrc} />}
      {displayPath}
    </Button>
  );
}