import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '~/stores/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should initialize with null user', () => {
    const store = useAuthStore();
    expect(store.user).toBeNull();
  });

  it('should not be authenticated by default', () => {
    const store = useAuthStore();
    expect(store.isAuthenticated).toBe(false);
  });

  it('should return empty display name when no user', () => {
    const store = useAuthStore();
    expect(store.displayName).toBe('');
  });

  it('should reset state', () => {
    const store = useAuthStore();
    store.error = 'some error';
    store.$reset();
    expect(store.error).toBeNull();
    expect(store.user).toBeNull();
    expect(store.isLoading).toBe(false);
  });
});
