require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resol = require('./resolvers/index');

const schemaPath = './schema/index.graphql';
const server = new ApolloServer({
    typeDefs: importSchema(schemaPath),
    resolvers: resol
});

server.listen(3333)
    .then(({ url }) => console.log(`Running on: ${url}`));