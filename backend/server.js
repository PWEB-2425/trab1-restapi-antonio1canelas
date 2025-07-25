// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('mock-data/bd.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
