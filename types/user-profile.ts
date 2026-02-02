export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserProfileInput {
  email: string;
  displayName: string;
  bio?: string;
}

export interface UpdateUserProfileInput {
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
}
