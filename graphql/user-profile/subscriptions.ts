export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile {
    onCreateUserProfile {
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
