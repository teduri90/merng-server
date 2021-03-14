const markersResolvers = require('./markers');
const usersResolvers = require('./users');
const feedbacksResolvers = require('./feedbacks');

module.exports = {
    Query: {
        ...markersResolvers.Query,
        ...usersResolvers.Query,
        ...feedbacksResolvers.Query
    },
    Mutation: {
        ...markersResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...feedbacksResolvers.Mutation
    }
};