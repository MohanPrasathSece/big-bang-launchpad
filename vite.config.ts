import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    {
      name: "api-dev-server",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith("/api/contact") && req.method === "POST") {
            try {
              let body = "";
              req.on("data", (chunk) => {
                body += chunk;
              });
              req.on("end", async () => {
                let parsedBody = {};
                try {
                  parsedBody = JSON.parse(body);
                } catch (e) {
                  // ignore
                }

                // Load the handler
                const { default: handler } = await server.ssrLoadModule("./api/contact.ts");

                // Mock Vercel req/res
                const vercelReq = Object.assign(req, { body: parsedBody }) as any;
                const vercelRes = {
                  status(code: number) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data: any) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                    return this;
                  },
                } as any;

                try {
                  await handler(vercelReq, vercelRes);
                } catch (err) {
                  console.error("API handler error:", err);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ message: "Internal server error", error: String(err) }));
                }
              });
            } catch (err) {
              console.error("Dev API server error:", err);
              res.statusCode = 500;
              res.end(JSON.stringify({ message: "Internal server error", error: String(err) }));
            }
          } else {
            next();
          }
        });
      },
    },
  ],
});
