import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.json({ success: false, message: "Not Authorized!" });
    }

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
