const { Router } = require("express");
const User = require("../Models/User");
const router = new Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../utils/checkAuth.js");

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Такого пользователя не существует" });

    const isValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPass)
      return res.status(400).json({ message: "Неверный пароль" });
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    res.json({
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Серверная ошибка" });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const pass = req.body.password;
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const doc = new User({
      login: req.body.login,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      { expiresIn: "30d" }
    );

    const { password, ...userData } = user._doc;
    res.json({ ...userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Серверная ошибка" });
  }
});
router.get("/me", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
    if (!user) res.status(404).json({ message: "Пользователь отсутствует" });
    const { password, ...userData } = user._doc;
    res.json({ user: userData, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Серверная ошибка" });
  }
});
module.exports = router;
