import AuthLayout from 'Components/AuthLayout';
import ForgotPassword from 'Screens/Auth/ForgotPassword';
import ResetPassword from 'Screens/Auth/ResetPassword';
import Login from 'Screens/Auth/Login';
import { defaultPattern, forgotPasswordPattern, resetPasswordPattern } from './routeConfig';

const AuthRoutes = {
  path: defaultPattern,
  element: <AuthLayout />,
  children: [
    {
      index: true,
      element: <Login />
    },
    {
      path: forgotPasswordPattern,
      element: <ForgotPassword />
    },
    {
      path: resetPasswordPattern,
      element: <ResetPassword />
    }
  ]
};

export default AuthRoutes;
