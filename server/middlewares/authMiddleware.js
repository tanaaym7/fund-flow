import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "user not found" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) {
        return res.json({ status: false });
      }
      req.user_id = data.id;
      next();
    });
  } catch (error) {
    return res.status(403).json({ error });
  }
};

export default verifyToken;
