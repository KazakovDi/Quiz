const { Router } = require("express");
const User = require("../Models/User");
const Quiz = require("../Models/Quiz");
const router = new Router();
const checkAuth = require("../utils/checkAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    req.imagePath = Math.random();
    callback(null, req.imagePath + file.originalname);
  },
});

const upload = multer({ storage });
router.get("/", async (req, res) => {
  const Quizes = await Quiz.find({}).populate("Author");
  res.json(Quizes);
});
router.post("/create", checkAuth, async (req, res) => {
  const author = await User.findById(req.userId);
  const doc = await new Quiz({
    title: req.body.title,
    cover: req.body.cover,
    description: req.body.description,
    tags: req.body.tags,
    questions: req.body.questions,
    Author: author,
  }).populate("Author");
  const post = await doc.save();
  res.json(post);
});
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});
router.post(
  "/uploadImage",
  checkAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      res.json({
        url: `/uploads/${req.imagePath + req.file.originalname}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
