const { ApolloServer, gql } = require('apollo-server-express');
import express from 'express';
import http from 'http';
import { origin, port } from './env';
import cors from 'cors';
import schema from './schema';

const app = express();
app.use(cors({ credentials: true, origin }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Server');
});

const server = new ApolloServer({ schema });

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin }
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
