const Mongoose = require("mongoose");

//connect mongoDB

const connectDB = async () => {
  try {
    const conn = await Mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected  : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);

    process.exit(1);
  }
};

exports.connectDB = connectDB;
