export default defineEventHandler(async (event) => {
  await requireAuth(event);

  // TODO: Implement list users from DynamoDB
  return {
    data: [],
    nextToken: null,
  };
});
