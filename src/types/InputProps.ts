export interface InputProps {
  inputId: string;
  label: string;
  value: string | number;
  onChange: (event: any) => void;
  inputType?: string;
  placeholder?: string;
}
