const { model, Schema } = require('mongoose');

// Each Marker with Lat and Lng will be an independent post by a user
// Users may see what they want to see based on filters

// What if someone wants to own the same location???

const FeedbackSchema = new Schema({
    username: String, 
    body: String, 
    createdAt: String,
});

module.exports = model('Feedback', FeedbackSchema);

// we can use GraphQL to enforce must