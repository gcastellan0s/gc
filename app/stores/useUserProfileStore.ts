import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  UserProfile,
  UpdateUserProfileInput,
} from '~/types/user-profile';

export const useUserProfileStore = defineStore('user-profile', () => {
  const profile = ref<UserProfile | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const hasProfile = computed(() => !!profile.value);
  const avatarUrl = computed(
    () => profile.value?.avatarUrl ?? '/default-avatar.png',
  );

  async function fetchProfile(userId: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      // TODO: Implement GraphQL getUserProfile query
    } catch (e: unknown) {
      error.value =
        e instanceof Error ? e.message : 'Failed to fetch profile';
    } finally {
      isLoading.value = false;
    }
  }

  async function updateProfile(input: UpdateUserProfileInput): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      // TODO: Implement GraphQL updateUserProfile mutation
    } catch (e: unknown) {
      error.value =
        e instanceof Error ? e.message : 'Failed to update profile';
    } finally {
      isLoading.value = false;
    }
  }

  function $reset(): void {
    profile.value = null;
    isLoading.value = false;
    error.value = null;
  }

  return {
    profile,
    isLoading,
    error,
    hasProfile,
    avatarUrl,
    fetchProfile,
    updateProfile,
    $reset,
  };
});
