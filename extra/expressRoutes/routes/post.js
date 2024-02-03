const express = require("express");
const router = express.Router();

// Index - posts
router.get("/", (req, res) => {
  res.send("Get for posts");
});

// Show - posts
router.get("/:id", (req, res) => {
  res.send("Get for post id");
});

// POST - posts
router.post("/", (req, res) => {
  res.send("POST for posts");
});

// DELETE - posts
router.delete("/:id", (req, res) => {
  res.send("DELETE for posts");
});

module.exports = router;