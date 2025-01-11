/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "pg-hstore": false, // Exclude unused modules
        "pg": false,        // Exclude PostgreSQL dependencies
      };
      return config;
    },
  };
  
  export default nextConfig;
  