import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { pw_hash_cost } from "../services/config";

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
      firstName: {
         type: String,
      },
      lastName: {
         type: String,
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
      const salt = await bcrypt.genSalt(pw_hash_cost);
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
