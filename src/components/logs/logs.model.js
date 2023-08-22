import mongoose from "mongoose";

const logEntrySchema = new mongoose.Schema({
   type: {
      type: String,
      enum: ["debug", "error", "info"],
      required: true,
   },
   message: {
      type: String,
      required: true,
   },
   data: {
      type: mongoose.SchemaTypes.Mixed,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const LogEntries = mongoose.model("LogEntry", logEntrySchema);

export default LogEntries;
