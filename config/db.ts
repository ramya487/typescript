import mongoose from 'mongoose'

const CONNECTION_URL:string = process.env.MONGO_DB as string;
let conn: mongoose.Mongoose;

export const connectDB = async () => {
    try {
        conn = await mongoose.connect(CONNECTION_URL);
        console.log(`${conn.connection.readyState} Successfully connected to MongoDB at: ${conn.connection.host}`)
    } catch (error: any) {
        console.log(error);
        process.exit();
    }
}

export const disConnectDB = async () => {
    try {
        await conn.disconnect();
        console.log(conn.connection.readyState,"DB disconnected successfully");
    } catch (error: any) {
        console.log(error);
        console.log("Cannot disconnect DB");
    }
}