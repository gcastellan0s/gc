import type { UpdateUserProfileInput } from '~/types/user-profile';

export function useUserProfile() {
  const profileStore = useUserProfileStore();
  const authStore = useAuthStore();

  async function loadProfile(): Promise<void> {
    const userId = authStore.user?.id;
    if (!userId) return;
    await profileStore.fetchProfile(userId);
  }

  async function updateProfile(input: UpdateUserProfileInput): Promise<void> {
    await profileStore.updateProfile(input);
  }

  return {
    profile: computed(() => profileStore.profile),
    isLoading: computed(() => profileStore.isLoading),
    error: computed(() => profileStore.error),
    hasProfile: computed(() => profileStore.hasProfile),
    avatarUrl: computed(() => profileStore.avatarUrl),
    loadProfile,
    updateProfile,
  };
}
