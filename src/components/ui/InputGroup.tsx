import type { InputProps } from "../../types/InputProps";
import styles from "../../styles/ui/Input.module.css";

const InputGroup = ({
  inputId,
  inputType = "text",
  label,
  value,
  onChange,
  placeholder = "Tu raczej coś wpisać trza...",
}: InputProps) => {
  return (
    <div className={styles.input__container}>
      <div className={styles.entryarea}>
        <input
          type={inputType}
          id={inputId}
          name={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          required
        />
        <div className={styles.labelline}>{label}</div>
      </div>
    </div>
  );
};

export default InputGroup;
