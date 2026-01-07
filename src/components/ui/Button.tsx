import styles from "../../styles/ui/Button.module.css";
import type { ButtonProps } from "../../types/InputProps";
import LoadingText from "./LoadingText";

// TODO: Zrobić rodzaje przycisków do  ALKOPOLY
const Button = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <LoadingText /> : children}
    </button>
  );
};

export default Button;
