<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Profile</h1>
    <UserProfileEditForm
      v-if="hasProfile && profile"
      :profile="profile"
      @submit="handleUpdate"
    />
    <UAlert v-if="error" color="error" :title="error" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import type { UpdateUserProfileInput } from '~/types/user-profile';

definePageMeta({ middleware: ['auth'] });

const { profile, error, hasProfile, loadProfile, updateProfile } =
  useUserProfile();

onMounted(() => loadProfile());

async function handleUpdate(input: UpdateUserProfileInput) {
  await updateProfile(input);
}
</script>
