<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UCard>
        <template #header>
          <h3 class="font-semibold">Welcome</h3>
        </template>
        <p>Hello, {{ authStore.displayName }}</p>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });

const authStore = useAuthStore();
</script>
