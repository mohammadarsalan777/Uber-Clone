import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        select: false
    },
    socketId: {
        type: String,
    }

}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}

userSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10)
}

export const UserModel = mongoose.model('User', userSchema)