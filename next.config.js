module.exports = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "instagram.fyvr4-1.fna.fbcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
