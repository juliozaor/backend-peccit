module.exports = {
    deploy : {
      production : {
        user : 'root',
        host : 'peccit_backend_prod',
        ref  : 'origin/main',
        repo : 'https://github.com/juliozaor/backend-peccit.git',
        path : '/var/peccit/backend_core',
        'post-deploy': 'npm install && npm run build && cp .env build/.env && cd build && npm ci --production && pm2 restart backend_core',
      }
    }
  };
  