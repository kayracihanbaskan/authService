import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("MongoDB connect successfully!")
        })
        connection.on("error",(err)=>{
            console.log("Mongo connection error.Please make sure MongoDB is running."+err)
            process.exit(1);
        })
    } catch (error) {
        console.log(`There is a mistake while connection ${error}`)
    }
}

export default connectDb