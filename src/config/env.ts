import validateEnv from "../validator/envValidator.js";

export const env = validateEnv();
console.log("Environment Variables:", env);

// export default env;
