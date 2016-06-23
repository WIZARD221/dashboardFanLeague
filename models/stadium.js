var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StadiumSchema = new Schema({
    name : String,
    city :  String,
    imageUrl : String,
    league : mongoose.Schema.ObjectId,
    stadiumSize : Number,
    locationCoordinates: {
        type: [Number],
        default: [0, 0]
    }
});

module.exports = mongoose.model('Stadium', StadiumSchema);
