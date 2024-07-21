module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		env: {
			production: {
				plugins: ['react-native-paper/babel'],
			},
		},
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@assets': './src/assets',
						'@components': './src/components',
						'@screens': './src/screens',
						'@storage': './src/storage',
						'@utils': './src/utils',
						'@services': './src/services',
						'@hooks': './src/hooks',
						'@contexts': './src/contexts',
						'@routes': './src/routes',
						'@styles': './src/styles',
						'@api': './src/api',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
