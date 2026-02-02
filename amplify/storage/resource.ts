import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'gc-uploads',
  access: (allow) => ({
    'users/{entity_id}/avatars/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
      allow.authenticated.to(['read']),
    ],
    'users/{entity_id}/documents/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    'tmp/*': [
      allow.authenticated.to(['read', 'write']),
    ],
  }),
  isDefault: true,
});

export const assetsStorage = defineStorage({
  name: 'gc-assets',
  access: (allow) => ({
    'assets/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],
  }),
});
