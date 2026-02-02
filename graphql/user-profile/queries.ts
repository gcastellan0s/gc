export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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

export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles($limit: Int, $nextToken: String) {
    listUserProfiles(limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        displayName
        avatarUrl
        bio
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
