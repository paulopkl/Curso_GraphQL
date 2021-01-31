const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resol = require('./resolvers/index');
const path = require('path');

const schemaPath = path.join(__dirname, 'schema', 'index.graphql');

const server = new ApolloServer({ 
    typeDefs: importSchema(schemaPath),
    resolvers: resol
});

const port = 3333;

server.listen(port).then(s => console.log(`Server is running in ${s.port}`));