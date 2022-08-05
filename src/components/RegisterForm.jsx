import React from 'react';
import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, Redirect } from 'react-router';
import { useRegister, useSession } from '../contexts/AuthProvider';

import LabelInput from './LabelInput';

const RegisterForm = () => {
  const { t } = useTranslation();
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
    username: { validate: { required: value => value===''? t('Error.required'): null } },
    password: {
      validate: {
        required: value => value===''? t('Error.required'): null,
        minLength8: value => value.length<8? (t('Error.minLength8')): null
      }
    },
    confirmPassword: {
      validate: {
        required: value => value===''? t('Error.required'): null,
        notIdentical: value => {
          const password = getValues('password');
          return password === value ? null : t('Error.samePassword');
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
            data-cy="username_input"
            validation={validationRules.username}/>
          <LabelInput
            label="password"
            type="password"
            data-cy="password_input"
            validation={validationRules.password} />
          <LabelInput
            label="confirmPassword"
            type="password"
            data-cy="confirmPassword_input"
            validation={validationRules.confirmPassword} />
          
          <div className="flex flex-row justify-end p-2 text-lg">
            <button type="submit" disabled={loading} className="pr-2 pl-2 m-1 font-semibold rounded-md border-2 bg-gray-200 border-gray-400 hover:bg-gray-400" data-cy="submit_btn">
              {t('Register.continue')}
            </button>
          </div>
        </form>
      </FormProvider>
  )
}

export default RegisterForm