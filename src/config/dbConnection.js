import { connect } from "mongoose";
const dbConnect = async () => {
  try {
    const mongoConnection = await connect(process.env.CONNECTION_STRING);
    console.log("Mongoose Database is connected");
  } catch (err) {
    console.log(`Database connection failed : ${err}`);
    process.exit(1);
  }
};

export default dbConnect;
