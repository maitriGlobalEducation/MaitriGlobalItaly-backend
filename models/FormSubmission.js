import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  fullName: String,
  dateOfBirth: String,
  gender: String,
  nationality: String,
  currentCountry: String,
  phone: String,
  email: String,
  position: String,
  qualification: String,
  yearOfGraduation: String,
  councilRegistered: String,
  docsReady: String,
  passportStatus: String,
  italianKnowledge: String,
  languageMode: String,
  availabilityDate: String,
  notes: String,

  submittedIp: String,
  submittedCountry: String
}, { timestamps: true });  
export default mongoose.model("FormSubmission", formSchema);

