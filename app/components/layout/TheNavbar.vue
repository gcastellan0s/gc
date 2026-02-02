<template>
  <header class="border-b border-(--ui-border) bg-(--ui-bg)">
    <nav class="flex items-center justify-between px-6 py-3">
      <div class="flex items-center gap-4">
        <UButton variant="ghost" icon="i-lucide-menu" @click="ui.toggleSidebar()" />
        <NuxtLink to="/" class="text-lg font-bold">gc-app</NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <UColorModeButton />
        <template v-if="isAuthenticated">
          <UButton to="/profile" variant="ghost">Profile</UButton>
          <UButton variant="outline" @click="logout">Sign Out</UButton>
        </template>
        <UButton v-else to="/login" variant="solid">Sign In</UButton>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const ui = useUiStore();
const { isAuthenticated, logout } = useAuth();
</script>
