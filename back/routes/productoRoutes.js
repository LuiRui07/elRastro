const express = require("express");
const router = express.Router();

const articleSchema = require("../models/articulos.js");

// create 
router.post("/", (req, res) => {
  const user = articleSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  articleSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  articleSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  articleSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update 
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  articleSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


