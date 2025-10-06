"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = uploads;
exports.videoUploads = videoUploads;
const cloudinary_1 = __importDefault(require("cloudinary"));
function uploads(filebuffer, public_id, overwrite = true, invalidate = true) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.v2.uploader.upload_stream({
            public_id,
            overwrite,
            invalidate,
            resource_type: "auto", // Automatically detect the file type
        }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        });
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
function videoUploads(file, public_id, overwrite, invalidate) {
    return new Promise((resolve) => {
        cloudinary_1.default.v2.uploader.upload(file, {
            public_id,
            overwrite,
            invalidate,
            resource_type: "video",
            chunk_size: 50000,
        }, (error, result) => {
            if (error)
                resolve(error);
            resolve(result);
        });
    });
}
