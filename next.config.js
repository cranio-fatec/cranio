/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// experimental: {
	// 	appDir: true
	// },
	compiler: {
		styledComponents: {
			meaninglessFileNames: ['index', 'styles'],
			namespace: 'cranio',
			ssr: true
		}
	},
	eslint: {
		ignoreDuringBuilds: !!process.env.IS_DEV
	},

	images: {
		domains: [
			'lh3.googleusercontent.com',
			'i.imgur.com',
			'avatars.githubusercontent.com'
		]
	},

	experimental: {
		swcPlugins: [
			[
				'next-superjson-plugin',
				{
					excluded: []
				}
			]
		]
	},

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack']
		})

		return config
	}
}

module.exports = nextConfig
