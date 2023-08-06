import { CustomAnotherButtonProps, CustomButtonProps } from "../../types";

// Custom Button
export const CustomButton = ({ onClick, buttonText, }: CustomButtonProps) => {
  return (
    <button
      className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded m-2"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

// Custom Another Button
export const CustomOtherButton = ({
  onClick,
  type,
  buttonText,
  className,
}: CustomAnotherButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        className ||
        "bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded m-2"
      }
    >
      {buttonText}
    </button>
  );
};
