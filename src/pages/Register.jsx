import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useRegister, useSession } from '../contexts/AuthProvider';

export default function Register() {
  const history = useHistory();
  const methods = useForm();
  const register = useRegister();
  const { loading, error, isAuthed } = useSession();
  const {
    handleSubmit,
    getValues,
  } = methods;

  const toDateInputString = (date) => {
    if(!date) return null;
    if(typeof date !== Object) {
      date = new Date(date);
    }
    const asString = date.toISOString();
    return asString.substring(0, asString.indexOf("T"));
  }

  const handleRegister = useCallback( async({
    firstName, 
    lastName, 
    username,
    password,
    birthDate,
  }) => {
    const success = await register(username, password, birthDate, firstName, lastName);

    if(success) {
      history.replace('/');
    }
  }, [history, register]);

  const validationRules = useMemo(() => ({
    firstName: {
      required: true
    },
    lastName: {
      required: true
    },
    username: {
      required: true
    },
    birthDate: {
      required:true
    },
    password: {
      required: true
    },
    confirmPassword: {
      required: true,
      validate: {
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : 'Both passwords need to be identical';
        }
      }
    }
  }), [getValues]);

  if (isAuthed) {
    return <Redirect from="/register" to="/tournaments" />
  }

  return (
    <FormProvider {...methods}>
      <div className="w-96">
        <h1 className="m-3 font-semibold">Register</h1>
        <form onSubmit={handleSubmit(handleRegister)}  className="bg-blue-200 m-5 pt-1 pb-1 pl-2 pr-2 border-2 border-blue-600 rounded-md text-black">
          {
            error ? (
              <p className="text-red-600">
                {error}
              </p>
            ) : null
          }
          <LabelInput
            label="username"
            type="text"
            defaultValue=""
            placeholder="Username123"
            validation={validationRules.username}/>
          <LabelInput
            label="firstName"
            type="text"
            defaultValue=""
            placeholder="First"
            validation={validationRules.firstName} />
          <LabelInput
            label="lastName"
            type="text"
            defaultValue=""
            placeholder="Last"
            validation={validationRules.lastName} />
          <LabelInput 
            label="birthDate"
            type="date"
            defaultValue={toDateInputString(new Date())}
            validation={validationRules.birthDate}
            data-cy="date_input" />
          <LabelInput
            label="password"
            type="password"
            defaultValue=""
            placeholder=""
            validation={validationRules.password} />
          <LabelInput
            label="confirmPassword"
            type="password"
            defaultValue=""
            placeholder=""
            validation={validationRules.confirmPassword} />
          
          <div className="flex flex-row justify-end p-2">
            <button type="submit" disabled={loading} className="pr-2 pl-2 m-1 font-semibold border-2 bg-gray-200 border-gray-400 hover:bg-gray-400 disabled:opacity-50">
              Register
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}