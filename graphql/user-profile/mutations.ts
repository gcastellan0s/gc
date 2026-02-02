export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile($input: CreateUserProfileInput!) {
    createUserProfile(input: $input) {
      id
      email
      displayName
      avatarUrl
      bio
      createdAt
      updatedAt
    }
  }
`;

export const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      id
      email
      displayName
      avatarUrl
      bio
      createdAt
      updatedAt
    }
  }
`;

export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile($input: DeleteUserProfileInput!) {
    deleteUserProfile(input: $input) {
      id
    }
  }
`;
