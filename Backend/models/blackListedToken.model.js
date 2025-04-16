import mongoose, { Schema } from 'mongoose';

const blackListedTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '24h', // Token will expire after 1 hour
    }
})

const BlackListedTokenModel = mongoose.model('BlackListedToken', blackListedTokenSchema)
export default BlackListedTokenModel