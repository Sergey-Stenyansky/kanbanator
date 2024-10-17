export const getApiBaseUrl = () =>
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.LOCAL_URL;
