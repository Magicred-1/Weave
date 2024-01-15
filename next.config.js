/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: config => {
		config.resolve.fallback = { fs: false, net: false, tls: false }
		return config
	},
	images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api.cloudnouns.com',
          },
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
}

module.exports = nextConfig