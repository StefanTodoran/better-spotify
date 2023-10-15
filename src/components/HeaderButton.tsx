import { useNavigate } from "react-router-dom";
import Button, { ButtonProps } from "./Button";

interface Props extends Omit<ButtonProps, "onClick"> {
  displayPath: string,
}

export default function HeaderButton({ displayPath,  ...props }: Props) {
  const navigate = useNavigate();
  const navigatePath = "/" + displayPath.toLowerCase().replace(/\s/g, "");

  return (
    <Button {...props} onClick={() => {
      console.log(navigatePath);
      navigate(navigatePath);
    }}>
      {displayPath}
    </Button>
  );
}