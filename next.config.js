module.exports = {
    reactStrictMode: true,
    rewrites: async () => ({
        beforeFiles: [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*'
            },
            {
                source: '/:id/result/:path*',
                destination: 'http://localhost:3080/:id/result/:path*'
            },
            {
                source: '/:id/result/',
                destination: 'http://localhost:3080/:id/result/'
            }
        ]
    }),
    webpack: (config) => {
        // camel-case style names from css modules
        config.module.rules
            .find(({oneOf}) => !!oneOf).oneOf
            .filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
            .reduce((acc, {use}) => acc.concat(use), [])
            .forEach(({options}) => {
                if (options.modules) {
                    options.modules.exportLocalsConvention = 'camelCase';
                }
            });
        return config;
    },
};
