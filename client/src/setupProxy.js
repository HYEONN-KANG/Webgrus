const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/webgrus',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
		})
	);
	app.use(
		'/users',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
		})
	);
	app.use(
		'/notice',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
		})
	);
	app.use(
		'/freeboard',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
		})
	);
	app.use(
		'/contest',
		createProxyMiddleware({
			target: 'http://localhost:3001',
			changeOrigin: true,
		})
	);
};
