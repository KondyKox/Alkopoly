export interface InputProps {
  inputId: string;
  label: string;
  value: string | number;
  onChange: (event: any) => void;
  inputType?: string;
  placeholder?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
