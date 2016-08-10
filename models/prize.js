
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PrizeSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    }
});


mongoose.model('Prize', PrizeSchema);