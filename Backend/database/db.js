import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then((res) => {
        console.log('Database connection established successfully.')
    }).catch((err) => {
        console.log('Database connection error.', err)
    })
}

export default connectDB