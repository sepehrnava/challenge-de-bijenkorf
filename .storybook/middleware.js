import { createProxyMiddleware } from "http-proxy-middleware";

export default (router) => {
  router.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3000/api/search",
      changeOrigin: true,
    })
  );
};
