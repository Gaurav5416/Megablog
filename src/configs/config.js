const configs = {
  VITE_APPWRITE_URL: String(import.meta.env.VITE_APPWRITE_URL),
  VITE_APPWRITE_PROJECT_ID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  VITE_APPWRITE_DATABASE_ID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  VITE_APPWRITE_COLLECTION_ID: String(
    import.meta.env.VITE_APPWRITE_COLLECTION_ID
  ),
  VITE_APPWRITE_BUCKET_ID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  VITE_APPWRITE_DEV_KEY: String(import.meta.env.VITE_APPWRITE_DEV_KEY),
};

export default configs;
