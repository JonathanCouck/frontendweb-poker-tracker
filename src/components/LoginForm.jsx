import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin, useSession } from '../contexts/AuthProvider';

import LabelInput from './LabelInput'
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, error } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
  } = methods;

  const validationRules = useMemo(() => ({
    username: { validate: { required: value => value===''? t('Error.required'): null } },
    password: { validate: { required: value => value===''? t('Error.required'): null } },
  }),[]);

  const handleLogin = useCallback(async({username,password}) => {
    const success = await login(username, password);
    if(success) {
      history.push('/games');
    }
  }, [history, login]);


  
  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(handleLogin)} className="w-min px-5 py-2 text-black bg-blue-300 rounded-md border-2 border-white">
        {
          error ? (
            <p className="text-red-600" data-cy="login_error">
              {error}
            </p>
          ) : null
        }
        <LabelInput
          label="username"
          type="text"
          data-cy="username_input"
          validation={validationRules.username} />

        <LabelInput
          label="password"
          type="password"
          data-cy="password_input"
          validation={validationRules.password} />

        <div className="flex flex-row justify-end p-2">
          <button type="submit" disabled={loading} className="pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md" data-cy="submit_btn">
            {t('Login.continue')}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default LoginForm