import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { options, label, className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block mb-1 text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 border border-gray-300 shadow-sm transition-all duration-200 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="text-gray-900">
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
