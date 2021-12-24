//Import
let models = require("../models");
let utils = require("../utils/jwtUtils");
const fs = require("fs");

//Création d'un commentaire
exports.create = (req, res) => {
  //Declaration de l'url de l'image
  let attachmentURL;
  //identifier qui créé le commentaire et sur quel post
  let id = utils.getUserId(req.headers.authorization);
  let postId = req.body.postId;
  models.post
    .findOne({
      attributes: ["id", "content", "attachement", "userId"],
      where: { id: postId },
    })
    .then((post) => {
      if (post !== null) {
        //Récupération du corps du post
        let content = req.body.content;
        if (req.file != undefined) {
          attachmentURL = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        } else {
          attachmentURL == null;
        }
        if (content == null && attachmentURL == null) {
          res.status(400).json({ error: "Rien à publier" });
        } else {
          models.comment
            .create({
              content: content,
              attachement: attachmentURL,
              userId: id,
              postId: post.id,
            })
            .then((newComment) => {
              res.status(201).json(newComment);
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      } else {
        res.status(400).json(error);
      }
    })
    .catch((error) => res.status(500).json(error));
};

//Afficher les commentaires sur le post
exports.listComs = (req, res) => {
  let post = req.body.postId;

  models.comment
    .findAll({
      attributes: ["id", "postId", "userId", "content"],
      where: { postId: post },
      order: [["createdAt", "DESC"]],
    })
    .then((comments) => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ error: "Pas de commentaires à afficher" });
      }
    })
    .catch((err) => res.status(500).json(err));
};

//Suppression d'un commentaire
exports.delete = (req, res) => {
  //req => userId, postId, user.isAdmin
  let userOrder = req.body.userIdOrder;
  //identification du demandeur
  let id = utils.getUserId(req.headers.authorization);
  models.user
    .findOne({
      attributes: ["id", "email", "username", "isAdmin"],
      where: { id: id },
    })
    .then((user) => {
      //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
      if (user && (user.isAdmin == true || user.id == userOrder)) {
        console.log("Suppression du commentaire id :", req.body.comId);
        models.comment
          .findOne({
            attributes: ["id", "postId", "userId", "content"],
            where: { id: req.body.comId },
          })
          .then((commentFind) => {
            if (commentFind.attachement) {
              const filename = commentFind.attachement.split("/images/")[1];
              console.log("teseeeest", filename);
              fs.unlink(`images/${filename}`, () => {
                models.comment
                  .destroy({
                    where: { id: commentFind.id },
                  })
                  .then(() =>
                    res
                      .status(200)
                      .json({ message: "Le commentaire est supprimé." })
                  )
                  .catch((err) => res.status(500).json(err));
              });
            } else {
              models.comment
                .destroy({
                  where: { id: commentFind.id },
                })
                .then(() =>
                  res
                    .status(200)
                    .json({ message: "Le commentaire est supprimé." })
                )
                .catch((err) => res.status(500).json(err));
            }
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(403)
          .json("Utilisateur non autorisé à supprimer ce commentaire");
      }
    })
    .catch((error) => res.status(500).json(error));
};

//Modification d'un commentaire
exports.update = (req, res) => {
  //récupération de l'id du demandeur pour vérification
  let userOrder = req.body.userIdOrder;
  //identification du demandeur
  let id = utils.getUserId(req.headers.authorization);
  models.user
    .findOne({
      attributes: ["id", "email", "username", "isAdmin"],
      where: { id: id },
    })
    .then((user) => {
      //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
      if (user && (user.isAdmin == true || user.id == userOrder)) {
        console.log("Modif ok pour le commentaire :", req.body.comId);
        models.comment
          .update(
            {
              content: req.body.newText,
              attachement: req.body.newImg,
            },
            { where: { id: req.body.comId } }
          )
          .then(() =>
            res.status(202).json({ message: "le commentaire est modifié!" })
          )
          .catch((err) => res.status(500).json(err));
      } else {
        res
          .status(401)
          .json({ error: "Utilisateur non autorisé à modifier ce post" });
      }
    })
    .catch((error) => res.status(500).json(error));
};
