import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/Merch`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default dbConnect;
