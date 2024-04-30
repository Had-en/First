import mongoose from "mongoose";

const mainSchema = new mongoose.Schema({
  loginTimes: {
    type: Number,
  },
  response: {
    type: String,
  },
});

const Main = mongoose.model("Main", mainSchema);
export default Main;
