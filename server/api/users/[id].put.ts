export default defineEventHandler(async (event) => {
  const decoded = await requireAuth(event);
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required',
    });
  }

  if (decoded.sub !== id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' });
  }

  // TODO: Implement update user in DynamoDB
  return {
    data: { id, ...body, updatedAt: new Date().toISOString() },
  };
});
