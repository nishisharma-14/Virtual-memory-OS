/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  basePath: process.env.GITHUB_ACTIONS && process.env.GITHUB_ACTIONS !== 'false' ? '/Virtual-memory-OS' : '',
};

export default nextConfig;
