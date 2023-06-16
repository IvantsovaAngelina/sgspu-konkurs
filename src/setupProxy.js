const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'http://45.8.97.195:8080',
      changeOrigin: true,
      secure: false,
      cors: true,
      onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    })
  );
};