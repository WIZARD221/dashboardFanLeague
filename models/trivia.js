
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TriviaSchema = new Schema({
    triviaLevel: {
        type: String
    },
    triviaType: {
        type: String
    },
    triviaQuestion: {
        type: String,
        trim: true
    },
    triviaAnswers: {
        type: [String],
    },
    triviaImage: {
        type: [String],
    },
    generalImage: {
        type: String,
    },
    correctAnswer: {
        type: Number
    },
    team : {
        type : mongoose.Schema.ObjectId, ref: 'TeamProfile'
    },
   triviaTime : {
        type : Date
    },
    updated : {
        type : Date,
        default : Date.now
    }
});


mongoose.model('Trivia', TriviaSchema);
