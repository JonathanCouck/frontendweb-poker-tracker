import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="flex flex-col col-span-6 pt-2 pb-2 sm:col-span-3">
      <label htmlFor={label} className="font-semibold">{label}:</label>
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label}
        name={label}
        {...rest}
      />
      {errors[label] && (
        <p data-cy="labelinput-error" className="text-red-500">
          {errors[label].message}
        </p>
      )}
    </div>
  );
};

export default LabelInput;