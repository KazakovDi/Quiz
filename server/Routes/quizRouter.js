const { Router } = require("express");
const User = require("../Models/User");
const Quiz = require("../Models/Quiz");
const router = new Router();
const checkAuth = require("../utils/checkAuth");

router.get("/", async (req, res) => {
  const Quizes = await Quiz.find({});
  res.json(Quizes);
});
router.post("/create", async (req, res) => {
  const doc = new Quiz({
    title: req.body.title,
    cover: req.body.cover,
    description: req.body.description,
    questions: req.body.questions,
  });
  const post = await doc.save();
  res.json(post);
});
router.get("/:id", async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});
// router.post("/:id/create-product", async (req, res) => {
//   const shop = await Shop.findById(req.params.id);
//   const doc = new Product({
//     price: req.body.price,
//     title: req.body.title,
//     description: req.body.description,
//     cover: req.body.cover,
//     shop: req.params.id,
//   });
//   const product = await doc.save();
//   shop.products.push(product);
//   await shop.save();
//   res.json(product);
// });

module.exports = router;
