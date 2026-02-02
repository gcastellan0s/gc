<template>
  <UCard>
    <div class="flex items-center gap-4">
      <UAvatar :src="profile.avatarUrl" :alt="profile.displayName" size="lg" />
      <div>
        <h3 class="font-semibold">{{ profile.displayName }}</h3>
        <p class="text-sm text-(--ui-text-muted)">{{ profile.email }}</p>
      </div>
    </div>
    <p v-if="profile.bio" class="mt-4 text-(--ui-text-muted)">
      {{ profile.bio }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
import type { UserProfile } from '~/types/user-profile';

defineProps<{
  profile: UserProfile;
}>();
</script>
