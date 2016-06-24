
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LeagueSchema = new Schema({
    name : {
        type : String
    },
    country : {
        type : String
    },
    imageUrl : {
        type : String
    },
    teams : {
        type :  [{ type : mongoose.Schema.ObjectId, ref: 'TeamProfile'}],
        default : []
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('League', LeagueSchema);
