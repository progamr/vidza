/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
  	reactStrictMode: true,
  	images: {
		domains: [
			'media.licdn.com',
			'lh3.googleusercontent.com',,
			'drive.google.com',
			'cdn.shopify.com',
		],
  	},
}

module.exports = nextConfig
