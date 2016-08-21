var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var PollItemArrayListSchema = new Schema({
    name: {
        type: String
    },
    PollItems : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'PollItem'}],
        default : []
    }
});

mongoose.model('PollItemArrayList', PollItemArrayListSchema);

