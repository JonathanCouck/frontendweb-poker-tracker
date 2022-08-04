import { useHistory } from 'react-router';
import { useRegister, useSession } from '../contexts/AuthProvider';

import RegisterForm from '../components/RegisterForm'
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const { isAuthed } = useSession();

  if (isAuthed) {
    return <Redirect from="/register" to="/games" />
  }

  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">{t('Register.register')}</h1>

      <RegisterForm />
    </div>
  );
}