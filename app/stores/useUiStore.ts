import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUiStore = defineStore('ui', () => {
  const isSidebarOpen = ref(false);
  const isLoading = ref(false);

  function toggleSidebar(): void {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function setLoading(value: boolean): void {
    isLoading.value = value;
  }

  function $reset(): void {
    isSidebarOpen.value = false;
    isLoading.value = false;
  }

  return {
    isSidebarOpen,
    isLoading,
    toggleSidebar,
    setLoading,
    $reset,
  };
});
