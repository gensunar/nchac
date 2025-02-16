import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: " https://e016-2401-4900-b201-d3d1-1db9-592f-eb3e-1e67.ngrok-free.app", // Local URL for development
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