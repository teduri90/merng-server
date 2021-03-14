////////////////////////////////
////////// LOAD MODEL //////////
////////////////////////////////
const Feedback = require('../../models/Feedback');

module.exports = {
    Query: {
        //// QUERY : LIST OF USERS /////
        async getFeedbacks() {
            try {
                const feedbacks = await Feedback.find();
                return feedbacks;
            } catch(err) {
                throw new Error(err);
            }
        },   
    },
    
    Mutation: {
        async createFeedback(_, {username, body}){
            const newFeedback = new Feedback({
                username,
                body,
                createdAt: new Date().toISOString()
            });

            const res = await newFeedback.save();

            return {
                ...res._doc,
                id: res.id,
            }

        },
    }
};
