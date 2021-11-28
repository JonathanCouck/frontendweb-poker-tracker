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
    reset,
    getValues,
  } = methods;

  const handleRegister = useCallback( async({
    firstName, 
    lastName, 
    username,
    password,
    birthDate,
  }) => {
    const success = await register(firstName, lastName, username, password, birthDate);

    if(success) {
      history.replace('/');
    }
  }, [history, register]);

  const handleCancel = useCallback(() => {
    reset()
  }, [reset]);

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
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(handleRegister)}>
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
            validation={validationRules.username} />
          <LabelInput
            label="firstName"
            type="text"
            defaultValue=""
            placeholder="Username123"
            validation={validationRules.firstName} />
          <LabelInput
            label="lastName"
            type="text"
            defaultValue=""
            placeholder="Username123"
            validation={validationRules.lastName} />
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
          
          <div>
            <button type="submit" disabled={loading} className="disabled:opacity-50">
              Register
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}