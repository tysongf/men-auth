import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { PASSWORD_HASH_DIFFICULTY } from "../services/config.js";

const userSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         match: /.+\@.+\..+/,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
   },
   {
      timestamps: true,
   }
);

// Hash and salt passwords before saving
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   try {
      const salt = await bcrypt.genSalt(PASSWORD_HASH_DIFFICULTY);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
   } catch (error) {
      return next(error);
   }
});

// Virtual property to get the full name
userSchema.virtual("fullName").get(function () {
   return `${this.firstName} ${this.lastName}`;
});

const Users = mongoose.model("User", userSchema);

export default Users;
