var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamProfileSchema = new Schema({
    name : String,
    country :  String,
    imageUrl : String,
    league : {
        type : mongoose.Schema.ObjectId, ref: 'League'
    },
    players : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'TeamPlayer'}],
        default : []
    },
    homeStadium : {
        type : mongoose.Schema.ObjectId, ref: 'Stadium'
    },
    homeColour : String,
    awayColour : String,
    keyWords : String
});

module.exports = mongoose.model('TeamProfile', TeamProfileSchema);
