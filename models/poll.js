
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    created: { type: Date, default: Date.now },
    team : {type : mongoose.Schema.ObjectId, ref: 'TeamProfile'},
    launchDate: Date,
    lastMatchResult: String,
    pollType: String,
    question: String,
    image: String,
    answers: {type : mongoose.Schema.ObjectId, ref: 'PollItemArrayList'},
    answersSums: [Number],
    createdBy: {type : mongoose.Schema.ObjectId, ref: 'User'}
});


mongoose.model('Poll', PollSchema);
