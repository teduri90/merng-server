const { gql } = require('apollo-server');

// IT DEFINES WHAT FIELDS ARE GOING TO BE IN GraphQL & QUERIES
module.exports = gql`
    type Marker {
        id: ID!
        username: String!
        lat: String!
        lng: String!
        body: String!
        image: String
        category: String!
        createdAt: String!
        likes: [Like]!
        comments: [Comment]!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Comment {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        image: String!
        followers: [Follower]!
        followings: [Following]!
        createdAt: String!
    }

    type Follower {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Following {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Feedback {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type Query {
        getMarkers: [Marker]
        filterMarkers(username: [String], category: [String]): [Marker]
        getUsers: [User]
        getFeedbacks: [Feedback]     
    }

    type Mutation {
        login(username: String!, password: String!): User!
        register(username: String!, email:String!, password:String!, confirmPassword:String!, image:String!): User!
        createMarker(lat: String!, lng: String!, body:String!, category: String!): Marker!
        likeMarker(markerId: ID!): Marker!
        commentMarker(markerId: ID!, body: String!): Marker!
        followingUser(userId: ID!, username: String): User!
        createFeedback(username: String!, body: String!): Feedback!
    }
    
`;

// getMarker(username: [String], category: [String]): [Marker]