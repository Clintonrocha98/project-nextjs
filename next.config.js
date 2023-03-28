/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["https://apod.nasa.gov"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "apod.nasa.gov",
                port: "",
                pathname: "/apod/image/**",
            },
        ],
    },
    env: {
        NASA_KEY: "kHwgPFH6S709YhS2hsgVJL2jcOSuGULZbiDNEyYk",
    },
};
