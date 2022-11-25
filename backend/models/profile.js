const {Schema, model} = require('mongoose')
/**
 * @typedef Profile
 * @property {string} _id
 * @property {string} name.required
 * @property {User} user.required
 * @property {Array.<Profile} following
 */
const profileSchema = new Schema({
    name: {
        type:String,
        required: true,
        minLenght: 2
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    following:[{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }],
    followers:[{
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }]
})

profileSchema.index({name:"text"})
module.exports = model('Profile', profileSchema)