/** @type {import('next').NextConfig} */
const imageRemotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
];

if (process.env.NEXT_PUBLIC_STRAPI_API_URL) {
  try {
    const u = new URL(process.env.NEXT_PUBLIC_STRAPI_API_URL);
    imageRemotePatterns.push({
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      pathname: "/uploads/**",
    });
  } catch {
    /* ignore invalid URL at build time */
  }
}

const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: imageRemotePatterns,
  },
};

export default nextConfig;
