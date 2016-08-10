
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AchievementSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});


mongoose.model('Achievement', AchievementSchema);