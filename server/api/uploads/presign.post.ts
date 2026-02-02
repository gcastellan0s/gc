export default defineEventHandler(async (event) => {
  const decoded = await requireAuth(event);
  const body = await readBody(event);

  const { fileName, contentType, purpose } = body as {
    fileName: string;
    contentType: string;
    purpose: 'avatar' | 'document';
  };

  if (!fileName || !contentType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'fileName and contentType are required',
    });
  }

  const config = useRuntimeConfig();
  const key =
    purpose === 'avatar'
      ? `users/${decoded.sub}/avatars/${fileName}`
      : `users/${decoded.sub}/documents/${fileName}`;

  const url = await getPresignedUploadUrl({
    bucket: config.public.s3BucketUploads,
    key,
    contentType,
    expiresIn: 3600,
  });

  return { data: { url, key } };
});
