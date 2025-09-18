import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="block mb-2 text-sm font-medium text-gray-700"
          htmlFor={id}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        ref={ref}
        className={`
          px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900
          w-full transition duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          placeholder-gray-400
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default Input;
