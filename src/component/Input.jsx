import { useForm } from "react-hook-form";

export default function Input({label , type , defaultValue,  validation, cls }) {
  const {register, handleSubmit, formState:{errors}, reset} = useForm();
  return(
    <input 
      {...register(label, validation)} 
      defaultValue={defaultValue}
      type={type} id={label} name={label} className={cls} /> 
  );
}