const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {

  register: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Users.findOne({ username: newUserName });
      if (user_name) return res.status(400).json({ msg: "Username already exists." });

      const user_email = await Users.findOne({ email });
      if (user_email) return res.status(400).json({ msg: "Email already exists." });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
        role: "user"
      });

      await newUser.save();

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Registered Successfully!",
        access_token,
        user: { ...newUser._doc, password: "" },
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // ✅ ADMIN REGISTER
  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, gender } = req.body;

      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user = await Users.findOne({ username: newUserName });
      if (user) return res.status(400).json({ msg: "Username exists." });

      const emailCheck = await Users.findOne({ email });
      if (emailCheck) return res.status(400).json({ msg: "Email exists." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newAdmin = new Users({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender,
        role: "admin"
      });

      await newAdmin.save();

      res.json({ msg: "Admin Registered Successfully!" });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // ✅ CHANGE PASSWORD
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const user = await Users.findById(req.user._id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Wrong password." });

      const newHash = await bcrypt.hash(newPassword, 12);

      await Users.findByIdAndUpdate(req.user._id, { password: newHash });

      res.json({ msg: "Password updated successfully." });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email, role: "user" });
      if (!user) return res.status(400).json({ msg: "Invalid credentials." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.json({
        msg: "Login success!",
        access_token,
        user: { ...user._doc, password: "" },
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // ✅ ADMIN LOGIN
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email, role: "admin" });
      if (!user) return res.status(400).json({ msg: "Invalid admin credentials." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid admin credentials." });

      const access_token = createAccessToken({ id: user._id });

      res.json({
        msg: "Admin login success!",
        access_token,
        user: { ...user._doc, password: "" },
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      res.json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) return res.status(400).json({ msg: "Login again." });

      jwt.verify(rf_token, process.env.TOKEN_KEY, async (err, result) => {
        if (err) return res.status(400).json({ msg: "Login again." });

        const user = await Users.findById(result.id).select("-password");

        const access_token = createAccessToken({ id: result.id });

        res.json({ access_token, user });
      });

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

// ✅ TOKEN FUNCTIONS
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "30d" });
};

module.exports = authCtrl;