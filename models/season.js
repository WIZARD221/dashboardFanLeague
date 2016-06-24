var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SeasonSchema = new Schema({
    year: {
        type: String,
        trim: true
    },
    league: {
        type : mongoose.Schema.ObjectId, ref: 'LeagueSchema'
    },
    created: {
        type: Date,
        default: Date.now
    },
    isCurrentSeason:{
        type: Boolean,
        default: true
    }
});


mongoose.model('Season', SeasonSchema);
