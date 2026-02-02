<template>
  <div>
    <h2 class="text-2xl font-bold text-center mb-6">Sign In</h2>

    <UForm :state="formState" class="space-y-4" @submit="handleLogin">
      <UFormField label="Email" name="email">
        <UInput v-model="formState.email" type="email" placeholder="you@example.com" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="formState.password" type="password" />
      </UFormField>

      <UButton type="submit" block :loading="isLoading">Sign In</UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' });

const { login, isLoading } = useAuth();

const formState = reactive({
  email: '',
  password: '',
});

async function handleLogin() {
  await login({ email: formState.email, password: formState.password });
}
</script>
