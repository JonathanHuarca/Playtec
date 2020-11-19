module.exports = {
  apps : [{
    name   : "courses-playtec",
    script : "dist/index.js",
    instances : "max",
    error_file: "./log/api_design_log.log",
    out_file: "./log/api_design_log.log",
    exec_mode : "cluster",
    kill_timeout : 3000,
    exp_backoff_restart_delay: 100,
    restart_delay: 3000,
    wait_ready : true,
    shutdown_with_message : true,
    max_memory_restart: '300M',
    args: [
      "--color"
    ],
    env: {
      NODE_ENV: 'development',
    },
    env_staging: {
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }]
}
