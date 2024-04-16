import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const currentUser = this;

  if (!currentUser.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(Number(process.env.GEN_SALT));
    const hashed_password = await bcrypt.hash(currentUser.password, saltRound);
    currentUser.password = hashed_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
