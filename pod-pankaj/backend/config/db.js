const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI);
        await mongoose.connect('mongodb+srv://viveksonitech:8564910720@cluster0.z7gof.mongodb.net/ai');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        // process.exit(1);
    }
};
module.exports = connectDB;


