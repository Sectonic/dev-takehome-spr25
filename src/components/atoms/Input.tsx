
type InputVariant = "primary";

interface InputProps {
  variant?: InputVariant;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  placeholder?: string;
  required?: boolean;
  name?: string;
  value?: string;
  label?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export default function Input({
  variant = "primary",
  type = "text",
  placeholder,
  required = false,
  name,
  label,
  onBlur,
  onFocus,
}: InputProps) {
  const baseStyles = "py-2 px-4 h-12 rounded-md transition w-full";

  const variantStyles: Record<InputVariant, string> = {
    primary: "bg-primary-fill outline-gray-stroke text-gray-text",
  };

  return (
    <div>
      {label && <label className="block">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        required={required}
        className={`${baseStyles} ${variantStyles[variant]}`}
      />
    </div>
  );
}
