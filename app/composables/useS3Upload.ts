import type { FileUploadResult } from '~/types/api';

interface UseS3UploadOptions {
  maxSizeMb?: number;
  allowedTypes?: string[];
}

const MAX_UPLOAD_SIZE_MB = 10;
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
];

export function useS3Upload(options: UseS3UploadOptions = {}) {
  const maxSize = (options.maxSizeMb ?? MAX_UPLOAD_SIZE_MB) * 1024 * 1024;
  const allowedTypes = options.allowedTypes ?? ALLOWED_FILE_TYPES;

  const isUploading = ref(false);
  const progress = ref(0);
  const error = ref<string | null>(null);

  function validateFile(file: File): string | null {
    if (file.size > maxSize) {
      return `File size exceeds ${options.maxSizeMb ?? MAX_UPLOAD_SIZE_MB}MB limit`;
    }
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }
    return null;
  }

  async function uploadFile(
    file: File,
    _path: string,
  ): Promise<FileUploadResult | null> {
    const validationError = validateFile(file);
    if (validationError) {
      error.value = validationError;
      return null;
    }

    isUploading.value = true;
    progress.value = 0;
    error.value = null;

    try {
      // TODO: Implement Amplify Storage uploadData
      return null;
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Upload failed';
      return null;
    } finally {
      isUploading.value = false;
    }
  }

  async function uploadAvatar(
    file: File,
    userId: string,
  ): Promise<FileUploadResult | null> {
    return uploadFile(file, `users/${userId}/avatars`);
  }

  return {
    isUploading: readonly(isUploading),
    progress: readonly(progress),
    error: readonly(error),
    uploadFile,
    uploadAvatar,
  };
}
