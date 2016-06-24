var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ArticleSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type : String
    },
    by: {
        type : String
    },
    updated : {
        type : Date,
        default : Date.now
    }
});


mongoose.model('Article', ArticleSchema);
