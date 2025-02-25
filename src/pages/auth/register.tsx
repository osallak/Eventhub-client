import { AuthLayout } from '@modules/auth/components/AuthLayout';
import { RegisterForm } from '@modules/auth/components/RegisterForm';
import { withAuth } from '@modules/auth/hocs/withAuth';
import { AUTH_MODE } from '@modules/auth/types/auth.types';
import Head from 'next/head';
import Routes from '@common/defs/routes';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Register | EventHub</title>
      </Head>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
};

// Add getStaticProps without translations
export const getStaticProps = async () => ({
  props: {},
});

export default withAuth(RegisterPage, {
  mode: AUTH_MODE.LOGGED_OUT,
  redirectUrl: Routes.Common.Home,
});
