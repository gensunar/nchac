import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: "https://711b-2401-4900-72b9-1f40-51b5-cb3c-3bcb-8e8f.ngrok-free.app", // Local URL for development
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