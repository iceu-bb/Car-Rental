const { ApolloServer } = require('apollo-server-express');
import express from 'express';
import http from 'http';
import { origin, port, mongo_uri } from './env';
import cors from 'cors';
import schema from './schema';
import mongoose from 'mongoose';

mongoose
  .connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch(() => console.log('Error with Db connection'));
mongoose.set('useFindAndModify', false);

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
