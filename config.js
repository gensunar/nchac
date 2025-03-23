import Constants from "expo-constants"

const ENV = {
  dev: {
    baseUrl: "https://3ec3-2401-4900-b201-a9a7-39a3-33c1-9be4-4d12.ngrok-free.app", // Local URL for development
  },
  prod: {
    baseUrl: "https://nchac-backend.onrender.com", // Base URL for production
    // baseurl: "https://nchac-backend.vercel.app"
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    // Development mode
    return ENV.dev;
  }
  // Production mode
  return ENV.prod;
};

export default getEnvVars();