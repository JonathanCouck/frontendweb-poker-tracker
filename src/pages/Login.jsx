import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from '../contexts/AuthProvider';

const validationRules = {
  username: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
    reset,
  } = methods;

  const handleLogin = useCallback(async({username,password}) => {
    const success = await login(username, password);

    if(success) {
      history.replace('/');
    }
  }, [history, login]);

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  if(isAuthed) {
    return <Redirect from="/login" to="/tournaments"/>
  }

  return (
    <FormProvider {...methods} >
      <div>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="bg-blue-200 w-min m-5 pt-1 pb-1 pl-2 pr-2 border-2 border-blue-600 rounded-md">
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
            data-cy="username_input"
            placeholder="Username123"
            validation={validationRules.username} />

          <LabelInput
            label="password"
            type="password"
            defaultValue=""
            data-cy="password_input"
            placeholder="Username123"
            validation={validationRules.password} />

          <div className="flex flex-row justify-end">
            <button
              data-cy="submit_btn"
              type="submit"
              disabled={loading}
              className="disabled:opacity-50">
              Sign in
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}