import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import connectMongo from './configs/mongo.config';
import { connectRedis } from './configs/redis.config';
import { connectPostgres } from './configs/postgres.config';

dotenv.config();

const app = express();

// Database and Redis connections
connectMongo();
connectRedis();
connectPostgres();

// Middleware
app.use(express.json());
app.use(cors());

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();
  server.applyMiddleware({ app });

  return app;
}

export default startApolloServer;
