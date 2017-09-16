const next = require('next');
const express = require('express');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();
const handler = routes.getRequestHandler(app)
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  server.use(handler);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on port ${port}...`);
  });
});
