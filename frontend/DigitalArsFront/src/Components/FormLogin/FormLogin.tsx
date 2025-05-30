import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Credentials' }];

// preview-start
const BRANDING = {
  logo: (
    <img
      src="https://mui.com/static/logo.svg"
      alt="MUI logo"
      style={{ height: 24 }}
    />
  ),
  title: 'Digitalars',
};
// preview-end

type AuthResponse = {
  status: 'success' | 'failure';
  error?: string;
};

export default function BrandingSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  const signIn = async (
    provider: AuthProvider,
    formData?: FormData
  ): Promise<AuthResponse> => {
    const email = formData?.get?.('email') as string | null;
    const password = formData?.get?.('password') as string | null;

    if (provider.id !== 'credentials' || !email || !password) {
      return {
        status: 'failure',
        error: 'provider inválido o faltan credentials',
      };
    }

    try {
      const response = await axios.post(
        '/api/auth/login',
        {
          email,
          password,
        },
        {
          withCredentials: true, // ESTA LÍNEA RESUELVE EL PROBLEMA DE CORS
        }
      );

      console.log('Respuesta del backend:', response.data);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
        return { status: 'success' };
      } else {
        return {
          status: 'failure',
          error: 'token no retornado por el server',
        };
      }
    } catch (error: any) {
      return {
        status: 'failure',
        error:
          error.response?.data?.message ||
          'solicitud de inicio de sesión fallida',
      };
    }
  };

  return (
    // preview-start
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{
          emailField: { autoFocus: false },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
    // preview-end
  );
}
