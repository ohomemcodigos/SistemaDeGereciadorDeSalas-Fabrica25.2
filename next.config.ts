import type { NextConfig } from "next";

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // O destino é a API
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
}

export default config;
