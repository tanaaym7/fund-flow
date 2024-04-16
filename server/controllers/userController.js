import User from "../models/userModel.js";
import Account from "../models/accountsModel.js";
import jwt from "jsonwebtoken";

async function userSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res
        .status(409)
        .json({ message: "You already have an account. Please log-in." });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    const userId = user._id;

    const userBalance = await Account.create({
      userId,
      balance: Math.floor(Math.random() * 10000 + 1),
    });

    return res.status(201).json({
      message: "User created successfully",
      userBalance,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error while signing in" });
  }
}

async function userSignin(req, res) {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return res
        .status(409)
        .json({ message: "You don't have an account. Please sign-up." });
    }
    //comapare password
    const isPasswordCorrect = await isUserExist.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //sign jwt token
    const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({ message: "Sucessfully logged in " });
  } catch (error) {
    return res.status(500).json({ message: "Error while logging in" });
  }
}

async function getUsers(req, res) {
  try {
    const filter = req.query.filter || "";
    const currentUserId = req.user_id;
    if (filter !== "") {
      const findUser = new RegExp(`^${filter}`, "i");
      const userList = await User.find({
        name: { $regex: findUser },
        _id: { $ne: currentUserId },
      });
      return res.json({
        user: userList.map((user) => ({
          name: user.name,
          _id: user._id,
        })),
      });
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching users" });
  }
}
export default { userSignup, userSignin, getUsers };
