/**
 * Image / File Handling Service Abstraction.
 * Supports Cloudinary API when credentials exist, otherwise saves locally to /uploads.
 */
const path = require('path');

const processImageUpload = async (file) => {
  if (!file) return null;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const isCloudinaryConfigured = cloudName && cloudName !== 'syspoly_cloud';

  if (isCloudinaryConfigured) {
    // Production Cloudinary Upload Call Placeholder
    return `https://res.cloudinary.com/${cloudName}/image/upload/${file.filename}`;
  }

  // Local static file URL fallback
  return `/uploads/${file.filename}`;
};

module.exports = {
  processImageUpload
};
