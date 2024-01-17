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
          {
            protocol: 'https',
            hostname: 'emerald-impressive-salmon-919.mypinata.cloud',
          }
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
}

module.exports = nextConfig