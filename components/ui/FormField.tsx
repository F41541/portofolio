import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormFieldProps {
  id?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  hint?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id: customId,
  label,
  icon,
  required,
  error,
  hint,
  className,
  children,
}) => {
  const generatedId = React.useId();
  const fieldId = customId || generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  const describedBy = [
    error ? errorId : null,
    hint ? hintId : null,
    React.isValidElement(children) ? (children.props as any)["aria-describedby"] : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const renderChildren = () => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        id: (children.props as any).id || fieldId,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : (children.props as any)["aria-invalid"],
      });
    }
    return children;
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={fieldId}
            className="text-xs font-medium text-text-secondary flex items-center gap-1.5 cursor-pointer"
          >
            {icon}
            <span>{label}</span>
            {required && <span className="text-accent-emerald" aria-hidden="true">*</span>}
          </label>
          {hint && <span id={hintId} className="text-[11px] text-text-muted">{hint}</span>}
        </div>
      )}
      {renderChildren()}
      {error && (
        <p id={errorId} role="alert" className="text-[11px] font-mono text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
