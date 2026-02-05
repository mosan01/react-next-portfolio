/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compress: true,
	poweredByHeader: false,
	experimental: {
		optimizePackageImports: ["marked", "microcms-js-sdk"],
	},
	images: {
		formats: ["image/avif", "image/webp"],
	},
};

export default nextConfig;
