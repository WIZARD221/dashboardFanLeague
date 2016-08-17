var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TeamProfileSchema = new Schema({
    name : String,
    country :  String,
    imageUrl : String,
    league : {
            type : mongoose.Schema.ObjectId, 
            ref: 'League'
    },
    players : {
        type :   [mongoose.Schema.ObjectId],
        default : []
    },
    homeStadium :{
            type : mongoose.Schema.ObjectId, ref: 'Stadium'
        },
    homeColour : String,
    awayColour : String,
    keyWords : []
});

module.exports = mongoose.model('TeamProfile', TeamProfileSchema);
