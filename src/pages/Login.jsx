import { useHistory, Redirect } from 'react-router';
import { useLogin, useSession } from '../contexts/AuthProvider';
import { useTranslation } from 'react-i18next';

import LoginForm from '../components/LoginForm';

export default function Login() {
  const { t } = useTranslation();
  const { isAuthed } = useSession();

  if(isAuthed) {
    return <Redirect from="/" to="/games"/>
  }
  
  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{t('Login.logIn')}</h1>
      <LoginForm />
    </div>
  )
}