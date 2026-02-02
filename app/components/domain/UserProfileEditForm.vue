<template>
  <UCard>
    <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
      <UFormField label="Display Name" name="displayName">
        <UInput v-model="formState.displayName" />
      </UFormField>

      <UFormField label="Bio" name="bio">
        <UTextarea v-model="formState.bio" />
      </UFormField>

      <UButton type="submit" :loading="isSubmitting">Save Changes</UButton>
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import type {
  UserProfile,
  UpdateUserProfileInput,
} from '~/types/user-profile';

const props = defineProps<{
  profile: UserProfile;
}>();

const emit = defineEmits<{
  submit: [input: UpdateUserProfileInput];
}>();

const isSubmitting = ref(false);

const formState = reactive({
  displayName: props.profile.displayName,
  bio: props.profile.bio ?? '',
});

async function handleSubmit() {
  isSubmitting.value = true;
  try {
    emit('submit', {
      displayName: formState.displayName,
      bio: formState.bio || undefined,
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>
