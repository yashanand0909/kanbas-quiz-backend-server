import mongoose from "mongoose";
import schema from "./schema.js";
const Model = mongoose.model("quizes", schema);
export default Model;