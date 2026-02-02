export default defineEventHandler(async (event) => {
  const decoded = await requireAuth(event);
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  if (decoded.sub !== id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  // TODO: Implement delete user from DynamoDB
  return { data: null, message: 'User deleted' };
});
