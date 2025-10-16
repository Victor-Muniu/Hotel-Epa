/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  allowedDevOrigins: [
    '8eb233eb9bf94ffdbf38e48a202723c8-ca3deb3d-84ce-4fa2-b486-a0b4ec.fly.dev',
    '59354d07d1fa46028ba91e23bd0fedbd-65f0a74f-84df-41a5-ae67-7407bc.fly.dev',
    'glaring-nougat.net'
  ]
};

module.exports = nextConfig;
