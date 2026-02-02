<template>
  <aside class="w-64 border-r border-(--ui-border) min-h-screen p-4">
    <nav class="space-y-1">
      <UButton
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        variant="ghost"
        block
        class="justify-start"
      >
        {{ item.label }}
      </UButton>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-lucide-home' },
  { label: 'Profile', to: '/profile', icon: 'i-lucide-user' },
];
</script>
