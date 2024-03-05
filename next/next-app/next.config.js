/** @type {import('next').NextConfig} */
const CodeFundi = require('C:/Users/HP/Documents/Code/GitHub/code-fundi-webpack-plugin/build/codefundi.bundle.js');


const nextConfig = {
  webpack: (config) => {

    config.plugins.push(new CodeFundi({
        apiKey: '1511275f-e520-4501-bd83-a4828b9612e4'
    }));
    
    return config;
  },
};

module.exports = nextConfig;
