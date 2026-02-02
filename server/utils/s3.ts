export interface PresignedUrlOptions {
  bucket: string;
  key: string;
  expiresIn?: number;
  contentType?: string;
}

export async function getPresignedUploadUrl(
  options: PresignedUrlOptions,
): Promise<string> {
  // TODO: Implement using @aws-sdk/s3-request-presigner
  console.log('[s3] getPresignedUploadUrl', options);
  return `https://${options.bucket}.s3.amazonaws.com/${options.key}?mock=true`;
}

export async function getPresignedDownloadUrl(
  options: PresignedUrlOptions,
): Promise<string> {
  // TODO: Implement using @aws-sdk/s3-request-presigner
  console.log('[s3] getPresignedDownloadUrl', options);
  return `https://${options.bucket}.s3.amazonaws.com/${options.key}?mock=true`;
}

export async function deleteObject(
  bucket: string,
  key: string,
): Promise<void> {
  // TODO: Implement using @aws-sdk/client-s3
  console.log('[s3] deleteObject', { bucket, key });
}
