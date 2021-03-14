const { ApolloServer } = require('apollo-server'); // ApolloServer 설정
const mongoose = require('mongoose'); // MongoDB 연결
const gql = require('graphql-tag');
const cors = require('cors');

const { MONGO_DB } = require('./config.js');

const PORT = process.env.PORT || 5000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    context: ({req}) => ({req}), // can be accessed across resolvers
});

mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connection is established');
        return server.listen({ port: PORT });
        // ASK OUR SERVER TO RUN IN PORT 5000
    })
    .then((res) => {
        console.log(`Server is running on ${res.url}`);
    })
    .catch((err) => {
        console.error(err);
    });