const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

class CloudinaryService {
  async uploadImage(file: File | string): Promise<string> {
    if (!CLOUD_NAME || !UPLOAD_PRESET || CLOUD_NAME === 'your_cloud_name') {
      console.warn('Cloudinary credentials not configured. Using mock upload for demo.');
      return this.mockUpload(file);
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }

  private async mockUpload(file: File | string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (typeof file === 'string') {
          resolve(file); // Return base64 if it's already a string
        } else {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }
      }, 1000);
    });
  }
}

export default new CloudinaryService();
