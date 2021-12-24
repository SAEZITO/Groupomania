//Imports
const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const comCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Routage pour les posts
router.put("/update", auth, multer, postCtrl.update);
router.post("/create", auth, multer, postCtrl.create);
router.delete("/delete", auth, postCtrl.delete);
router.get("/", auth, postCtrl.listMsg);

//Routage pour les commentaires
router.put("/comment/update", auth, multer, comCtrl.update);
router.post("/comment/create", auth, multer, comCtrl.create);
router.delete("/comment/delete/", auth, comCtrl.delete);
router.get("/comment/", auth, comCtrl.listComs);

module.exports = router;
