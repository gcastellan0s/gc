import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { AuthUser } from '~/types/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value?.isAuthenticated);
  const displayName = computed(
    () => user.value?.displayName ?? user.value?.email ?? '',
  );

  async function login(email: string, password: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      // TODO: Implement Amplify Auth signIn
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Login failed';
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout(): Promise<void> {
    // TODO: Implement Amplify Auth signOut
    user.value = null;
  }

  async function checkAuthState(): Promise<void> {
    // TODO: Implement Amplify Auth getCurrentUser
  }

  function $reset(): void {
    user.value = null;
    isLoading.value = false;
    error.value = null;
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    displayName,
    login,
    logout,
    checkAuthState,
    $reset,
  };
});
