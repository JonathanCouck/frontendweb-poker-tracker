import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin, useSession } from '../contexts/AuthProvider';

import LabelInput from './LabelInput'

const validationRules = {
  username: {
    required: true
  },
  password: {
    required: true
  }
};


const LoginForm = () => {
  const history = useHistory();
  const { loading, error } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
  } = methods;

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
          defaultValue=""
          data-cy="username_input"
          placeholder="Username123"
          validation={validationRules.username} />

        <LabelInput
          label="password"
          type="password"
          defaultValue=""
          data-cy="password_input"
          placeholder="********"
          validation={validationRules.password} />

        <div className="flex flex-row justify-end p-2">
          <button
            data-cy="submit_btn"
            type="submit"
            disabled={loading}
            className="pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400 rounded-md">
            Sign in
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default LoginForm