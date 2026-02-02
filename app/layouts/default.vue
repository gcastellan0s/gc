<template>
  <div class="min-h-screen bg-(--ui-bg)">
    <LayoutTheNavbar />
    <div class="flex">
      <LayoutSidebar v-if="ui.isSidebarOpen" />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const ui = useUiStore();
</script>
