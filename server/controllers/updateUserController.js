import User from "../models/userModel.js";

async function updateUser(req, res) {
  try {
    const userId = req.user_id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Iterate through the keys in the request body
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        // If the key is 'password', compare the password
        if (key === "password") {
          const isSamePassword = await user.comparePassword(req.body[key]);
          if (!isSamePassword) {
            user.password = req.body[key]; // trigger pre-save hook for hashing
          } else {
            return res.json({
              message:
                "Your new password can not be same as any of your recent passwords",
            });
          }
        } else {
          // Update other fields
          if (req.body[key] !== user[key]) {
            user[key] = req.body[key];
          }
        }
      }
    }

    // Save the updated user
    await user.save();

    // Return a successful response with the updated user data (excluding the password)
    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        // Exclude the password field
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in updating",
      error,
    });
  }
}

export default updateUser;
