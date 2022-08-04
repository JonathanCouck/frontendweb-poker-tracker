import { useHistory } from 'react-router';
import { useRegister, useSession } from '../contexts/AuthProvider';

import RegisterForm from '../components/RegisterForm'

export default function Register() {
  const { isAuthed } = useSession();

  if (isAuthed) {
    return <Redirect from="/register" to="/games" />
  }

  return (
    <div className="m-5">
      <h1 className="font-semibold text-2xl mb-5">Register</h1>

      <RegisterForm />
    </div>
  );
}