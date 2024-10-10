module.exports = {
    apps: [
      {
        name: 'studentms-app',
        script: './server.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
          NODE_ENV: 'production',
          DB_HOST: 'mysql-container',
          DB_USER: 'root',
          DB_PASSWORD: 'my-secret-pw',
          DB_NAME: 'cyber_school',
          DB_DIALECT: 'mysql',
          DB_PORT: 3306,
        },
      },
    ],
};