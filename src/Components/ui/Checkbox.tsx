import React from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="peer h-4 w-4 absolute z-10"
            ref={ref}
            {...props}
          />
          <div className={cn(
            "h-4 w-4 border border-gray-300 rounded flex items-center justify-center",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2",
            "peer-checked:bg-blue-600 peer-checked:border-blue-600",
            "transition-colors",
            className
          )}>
            <Check className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
          </div>
        </div>
        {label && (
          <label className="ml-2 text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;