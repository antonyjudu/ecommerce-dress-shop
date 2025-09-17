import validator from 'validator';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUserToken = (id) => {
  return jwt.sign({ id, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const createAdminToken = () => {
  return jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist!" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const token = createUserToken(user._id);
    res.json({ success: true, userToken: token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// User Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = createUserToken(savedUser._id);
    res.json({ success: true, userToken: token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = createAdminToken();
      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid admin credentials!" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
