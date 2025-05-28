import { type ConfigEnv, defineConfig, loadEnv, type UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const configEnv = loadEnv(mode, './src/env');
  console.log()
  console.log(configEnv)

  return defineConfig({
    plugins: [react()],
    server: {
      // 项目启动是否打开页面
      open: true,
      port: +configEnv.VITE_SERVER_PORT,
      host: '0.0.0.0',
      proxy: {
        [configEnv.VITE_API_BASE_URL]: {
          target: configEnv.VITE_API_TARGET_URL,
          changeOrigin: true,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('[proxyReq]', req.method, req.url, '->', proxyReq.getHeader('host'));
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              console.log('[proxyRes]', req.method, req.url, '->', proxyRes.statusCode);
            });
          },
        },
      },
    },
  });
};
