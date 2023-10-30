import { useState } from "react";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="flex flex-col w-full relative pb-2">
      <input
        className={`peer bg-slate-100 outline-teal-600 p-2 my-2 rounded-md border-2 border-teal-500 ${focused===true?"invalid:border-red-600":""} placeholder-transparent`}
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <label className="absolute left-2 -top-1 bg-slate-100 text-teal-700 peer-focus:left-2 peer-focus:-top-1 peer-focus:text-teal-700 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-5 peer-placeholder-shown:left-4 pointer-events-none transition-all">{label}</label>

      <span className={`text-[12px] text-red-700 hidden ${focused===true?"peer-invalid:block":""}`}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;