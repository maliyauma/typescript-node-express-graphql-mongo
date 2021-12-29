// @ts-check
import 'reflect-metadata'
import express  from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscribe } from 'graphql';
import { execute } from 'graphql';
import mongoose  from 'mongoose';
import {buildSchema} from 'type-graphql'
import { TestResolver } from './resolvers/TestResolver';
import { SampleResolver } from './resolvers/SampleResolver';




(async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);
  // const schema = makeExecutableSchema({ typeDefs,resolvers:[catResolvers,PostResolver,UserResolver]});

  const schema=await buildSchema({
    resolvers:[TestResolver,SampleResolver],
    validate:false
})
  
  const server = new ApolloServer({
    schema,
  })
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


})().catch(e=> console.log('error on server ====== ',e))