import mongoose from "mongoose";

const connectDb = async () => {
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to database');
    }
    catch(err){
        console.log(err);
    }
}

export default connectDb;