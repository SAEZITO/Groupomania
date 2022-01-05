const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment.controllers");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.listComment);
router.get("/:id", auth, commentCtrl.listAComment);
router.post("/", auth, commentCtrl.createComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
