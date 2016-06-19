var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamProfileSchema = new Schema({
    name : String,
    country :  String,
    imageUrl : String,
    league : mongoose.Schema.ObjectId,
    players : {
        type :   [mongoose.Schema.ObjectId],
        default : []
    },
    homeStadium : mongoose.Schema.ObjectId,
    homeColour : String,
    awayColour : String,
    keyWords : String
});

module.exports = mongoose.model('TeamProfile', TeamProfileSchema);
