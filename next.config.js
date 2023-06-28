/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cms.nhl.bamgrid.com',
				port: ''
				// pathname: 'images/headshots/current/168x168/'
			}
		]
	}
};

module.exports = nextConfig;
