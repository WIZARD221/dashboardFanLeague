var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PollItemSchema = new Schema({
    text: {
        type: String,
        default : " "
    },
    imageUrl: {
        type: String,
        default : " "
    },
    numOfChoosers: {
        type: Number,
        default : 0
    }
});

mongoose.model('PollItem', PollItemSchema);
