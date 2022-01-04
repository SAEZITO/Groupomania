const comentCtrl = require("../controllers/commment.controllers");
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.post("/comment", auth, comentCtrl.createComment);

router.delete("/comment/:id", auth, comentCtrl.deleteComment);

module.exports = router;
