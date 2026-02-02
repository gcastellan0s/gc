import type {
  LoginCredentials,
  SignUpCredentials,
  AuthProvider,
} from '~/types/auth';

export function useAuth() {
  const authStore = useAuthStore();
  const router = useRouter();

  async function login(credentials: LoginCredentials): Promise<void> {
    await authStore.login(credentials.email, credentials.password);
    await router.push('/dashboard');
  }

  async function loginWithProvider(_provider: AuthProvider): Promise<void> {
    // TODO: Implement signInWithRedirect({ provider: 'Google' })
  }

  async function signUp(_credentials: SignUpCredentials): Promise<void> {
    // TODO: Implement Amplify Auth signUp
  }

  async function logout(): Promise<void> {
    await authStore.logout();
    await router.push('/login');
  }

  async function confirmSignUp(
    _email: string,
    _code: string,
  ): Promise<void> {
    // TODO: Implement Amplify Auth confirmSignUp
  }

  return {
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
    login,
    loginWithProvider,
    signUp,
    logout,
    confirmSignUp,
  };
}
