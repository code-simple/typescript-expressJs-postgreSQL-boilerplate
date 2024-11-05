/**
 * create Another Object in message to show these messages 
 * exports.s3UploadError = 'Error deleting the file';
exports.s3FileRetrieveError = 'Error retrieving the object';
exports.s3UploadingError = 'Error uploading the file';
exports.videoUploaded = 'Video Successfully Uploaded';
exports.pleaseAuthenticate = 'Please authenticate';
exports.userNotFound = 'User not found';
 */

export const message = {
  TOKEN: {
    NOT_FOUND: "Token not found",
  },
  AUTH: {
    EMAIL_NOT_VERIFIED: "Email not verified",
    CANNOT_CHANGE_PASSWORD: "Cannot change password",
    PLEASE_AUTHENTICATE: "Please authenticate",
    USER_NOT_FOUND: "User not found",
  },
  S3: {
    DELETED: "Deleted successfully",
    UPLOAD_ERROR: "Error uploading the file",
    UPLOAD_SUCCESS: "Successfully uploaded the file",
    NO_FILE_PROVIDED: "No file was uploaded",
    FILE_RETRIEVE_ERROR: "Error retrieving the object",
    DELETE_ERROR: "Error deleting the file",
    VIDEO_UPLOADED: "Video successfully uploaded",
    FILEKEY_REQUIRED: "File key required",
  },
};
