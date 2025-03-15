import Constants from "expo-constants"

const ENV = {
    dev: {
      baseUrl: " https://a254-2401-4900-b1f3-55d7-c9fb-91b6-2171-c5c7.ngrok-free.app", // Local URL for development
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