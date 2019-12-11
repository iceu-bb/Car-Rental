const { ApolloServer } = require('apollo-server-express');
import express from 'express';
import http from 'http';
import { origin, port, mongo_uri, secret } from './env';
import cors from 'cors';
import schema from './schema';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB connected'))
  .catch((err: Error) => console.log('Error with Db connection', err));

const app = express();
app.use(cors({ credentials: true, origin }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Server');
});

const server = new ApolloServer({
  schema,
  context: async ({ req, res }: any) => {
    let decodedToken;
    const authToken = req.headers.authorization;

    if (authToken) {
      decodedToken = jwt.verify(authToken, secret);
    }

    return { decodedToken };
  }
});

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: { credentials: true, origin }
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
