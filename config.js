import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: "https://2d24-2401-4900-72c0-9e11-25c2-8d93-afad-fff5.ngrok-free.app", // Local URL for development
    },
    prod: {
      baseUrl: "https://nchac-backend.onrender.com", // Base URL for production
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