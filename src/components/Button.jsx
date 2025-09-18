export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        px-5 py-2.5 rounded-lg font-semibold transition 
        duration-200 ease-in-out transform hover:scale-105
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1 
        focus:ring-${bgColor.replace('bg-', '')} ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
