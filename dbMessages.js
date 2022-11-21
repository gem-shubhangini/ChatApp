import mongoose from "mongoose";
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  email:String,
  timestamp: String,
  user:String,
   userEmail:String
});

export default mongoose.model("messagecontents", whatsappSchema);
