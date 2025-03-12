import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: "https://de51-2401-4900-b208-c8c5-3537-efc3-51ab-92ea.ngrok-free.app", // Local URL for development
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