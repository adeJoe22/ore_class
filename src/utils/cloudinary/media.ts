import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export function uploads(
  filebuffer: Buffer,
  public_id?: string,
  overwrite = true,
  invalidate = true,
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: "auto", // Automatically detect the file type
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    // Pass the buffer content to the upload stream
    uploadStream.end(filebuffer);
  });
}
// export function uploads(
//   file: string,
//   public_id?: string,
//   overwrite?: boolean,
//   invalidate?: boolean,
// ): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
//   return new Promise((resolve) => {
//     cloudinary.v2.uploader.upload(
//       file,
//       {
//         public_id,
//         overwrite,
//         invalidate,
//         resource_type: "auto",
//       },
//       (
//         error: UploadApiErrorResponse | undefined,
//         result: UploadApiResponse | undefined,
//       ) => {
//         if (error) resolve(error);
//         resolve(result);
//       },
//     );
//   });
// }
export function videoUploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean,
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        resource_type: "video",
        chunk_size: 50000,
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) resolve(error);
        resolve(result);
      },
    );
  });
}
