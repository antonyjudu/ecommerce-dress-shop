import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { usertoken } = req.headers;
  if (!usertoken) {
    return res.json({ success: false, message: "Not Authorized, login again!" });
  }

  try {
    const decoded = jwt.verify(usertoken, process.env.JWT_SECRET);
    if (decoded.role !== "user") {
      return res.json({ success: false, message: "Not Authorized!" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
