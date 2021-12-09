import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router';
import LabelInput from '../components/LabelInput';
import { useLogin, useSession } from '../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';

const validationRules = {
  username: {
    required: true
  },
  password: {
    required: true
  }
};

export default function Login() {
  const { t } = useTranslation();
  const history = useHistory();
  const { loading, error, isAuthed } = useSession();
  const login = useLogin();
  const methods = useForm();
  const {
    handleSubmit,
  } = methods;

  const handleLogin = useCallback(async({username,password}) => {
    const success = await login(username, password);
    if(success) {
      history.replace('/');
    }
  }, [history, login]);

  if(isAuthed) {
    return <Redirect from="/" to="/tournaments"/>
  }

  return (
    <FormProvider {...methods} >
      <div className="w-96">
        <h1 className="m-3 font-semibold">{t('signIn')}</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="bg-blue-200 m-5 pt-1 pl-2 pr-2 border-2 border-blue-600 rounded-md text-black">
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
            placeholder=""
            validation={validationRules.password} />

          <div className="flex flex-row justify-end p-2">
            <button
              data-cy="submit_btn"
              type="submit"
              disabled={loading}
              className="pr-2 pl-2 m-1 border-2 bg-gray-200 border-gray-400 font-semibold disabled:opacity-50 hover:bg-gray-400">
              {t("signIn")}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}