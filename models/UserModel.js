const {Schema, model} = require('mongoose');
const moment = require('moment');

const UsermodelSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'User email address required'],
        unique: true,
        // looked to mongoose for help with regex validation
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UsermodelSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const UserSchema = model('UserSchema', UsermodelSchema);

module.exports = UserSchema;