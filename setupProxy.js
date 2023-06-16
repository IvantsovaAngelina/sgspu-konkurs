const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://45.8.97.195:8080/api/',
      changeOrigin: true
    })
  );
};