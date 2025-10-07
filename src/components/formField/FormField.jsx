const FormField = ({ label, type, name, placeholder, value, onChange, error }) => {
  if (type === "textarea") {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className="w-full outline-0 border border-gray-300 focus:border-gray-500 rounded-md p-2 placeholder:text-sm max-h-[160px] min-h-[100px]"
          value={value}
          onChange={onChange}
        />
        {error && <p className="text-red-500 text-xs">* {error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full outline-0 border border-gray-300 focus:border-gray-500 rounded-md p-2 placeholder:text-sm"
        value={value}
        onChange={onChange}
        min={0}
      />
      {error && <p className="text-red-500 text-xs">* {error}</p>}
    </div>
  );
};

export default FormField;
