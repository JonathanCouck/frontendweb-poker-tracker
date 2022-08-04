import React from 'react';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router';
import { useRegister, useSession } from '../contexts/AuthProvider';

import LabelInput from './LabelInput';

const RegisterForm = () => {
  const history = useHistory();
  const methods = useForm();
  const register = useRegister();
  const { loading, error } = useSession();
  const {
    handleSubmit,
    getValues,
  } = methods;

  const handleRegister = useCallback( async({
    username,
    password,
  }) => {
    const success = await register(username, password);

    if(success) {
      history.push('/');
    }
  }, [history, register]);

  const validationRules = useMemo(() => ({
    username: {
      required: true
    },
    password: {
      required: true,
      minLength: 8
    },
    confirmPassword: {
      required: true,
      validate: {
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : 'Same password';
        }
      }
    }
  }), [getValues]);

  return (
    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegister)}  className="w-min px-5 py-2 text-black bg-blue-300 rounded-md border-2 border-white">
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
            label="password"
            type="password"
            defaultValue=""
            placeholder="********"
            validation={validationRules.password} />
          <LabelInput
            label="confirmPassword"
            type="password"
            defaultValue=""
            placeholder="********"
            validation={validationRules.confirmPassword} />
          
          <div className="flex flex-row justify-end p-2 text-lg">
            <button type="submit" disabled={loading} className="pr-2 pl-2 m-1 font-semibold rounded-md border-2 bg-gray-200 border-gray-400 hover:bg-gray-400">
              Register
            </button>
          </div>
        </form>
      </FormProvider>
  )
}

export default RegisterForm