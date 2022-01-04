const { Comment } = require("../models");
const fs = require("fs");

//Section commentaire
//Créer un commentaire
exports.createComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.body.UserId } });
    const post = await Post.findOne({ where: { id: req.body.PostId } });
    const comment = new Comment({
      UserId: user.id,
      PostId: post.id,
      text: req.body.text,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    });
    comment.save();
    res.status(200).json({
      ...comment,
      User: { first_name: user.first_name, last_name: user.last_name },
    });
    console.log(post, user);
  } catch (error) {
    res.status(404).json({ error: "Mauvaise requête" });
  }
};

//Supprimer un commentaire
exports.deleteComment = (req, res, next) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      res.status(200).json({ message: "Commentaire supprimé" });
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
};
