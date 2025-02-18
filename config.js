import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: "https://cb8e-2401-4900-72ca-fc08-90a8-a6e4-9264-f4fa.ngrok-free.app", // Local URL for development
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