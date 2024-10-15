/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.API_URL,
    },
};

export default nextConfig;
