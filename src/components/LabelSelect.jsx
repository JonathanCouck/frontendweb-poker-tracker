import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const LabelSelect = ({label, options, validation, ...rest}) => {
  const { t } = useTranslation();
  const { register, formState: { errors } } = useFormContext();
  return (
    <div className="w-80 flex flex-col col-span-6 sm:col-span-3 pt-2 pb-2">
      <label htmlFor={label} className="font-semibold">{t(label)}:</label>
      <select 
        className="text-black p-1"
        {...register(label, validation)}
        {...rest}
        id={label}
        name={label}>
        <option value="">--{t('chooseA')} {t(label)}--</option>
        {options.map((value) => (
          <option key={value.id} value={value.id}>
            {value.name}
          </option>
        ))}
      </select>
      {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
    </div>
  );
};

export default LabelSelect;