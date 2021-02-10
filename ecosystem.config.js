module.exports = {
  apps: [
    {
      name: 'Connect',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start --hostname 0.0.0.0 --port 3300'
    }
  ]
}
