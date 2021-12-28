// @ts-check
import { typeDefs } from './typeDefs/typeDefs';

import express  from 'express';
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscribe } from 'graphql';
import { execute } from 'graphql';
import mongoose  from 'mongoose';
import { catResolvers } from './resolvers/catResolver';
import { PostResolver } from './resolvers/PostResolver';
import { UserResolver } from './resolvers/UserResolver';



(async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs,resolvers:[catResolvers,PostResolver,UserResolver]});

  const server = new ApolloServer({
    schema,
  });
  await server.start().catch(e=>{console.log("error starting server===== ")})
  server.applyMiddleware({ app });

  var uri = "mongodb://localhost:27017/newmango";
  // @ts-ignore
  mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(e=>console.log("connected to mongo db"))
  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    );
  });


})();