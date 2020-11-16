const pm2Config = {
  apps: [
    {
      name: "app",
      script: "./server.js",
      watch: true,
      instances: 1,
      exec_mode: "fork",
    },
  ],
};

module.exports = pm2Config;
