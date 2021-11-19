import mongoose from "mongoose";

const databaseService = {
    async connect() {
        mongoose.connect(`mongodb+srv://nguyenkhavi:${process.env.MONGODB_PASSWORD}@cluster0.vo4ad.mongodb.net/${process.env.MONGODB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.on('error', (e) => { throw e });
    }
}

export default databaseService