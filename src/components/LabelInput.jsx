import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="w-80 flex flex-col col-span-6 pt-2 pb-2 sm:col-span-3">
      <label htmlFor={label} className="font-semibold">
        {
          t(`Form.${label}`)
        }:
      </label>
      <input className="text-black p-1 rounded-md"
        {...register(label, validation)}
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