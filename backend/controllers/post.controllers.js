const { Post } = require("../models");
const { Comment } = require("../models");
const { User } = require("../models");
const fs = require("fs");

// Afficher tous les messages
exports.getPost = async (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      { model: User, attributes: ["first_name", "avatar", "last_name"] },
      {
        model: Comment,
        attributes: [
          "id",
          "text",
          "first_name",
          "last_name",
          "UserId",
          "PostId",
        ],
      },
    ],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Afficher un seul message
exports.getOnePost = async (req, res, next) => {
  const postParams = req.params;

  Post.findOne({
    where: { id: postParams.id },
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//Créer un message
exports.createPost = async (req, res, next) => {
  let image;
  User.findOne({
    attributes: ["first_name", "avatar", "last_name", "id"],
    where: { id: req.body.UserId },
  })
    .then((user) => {
      if (user !== null) {
        if (req.file) {
          image = `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`;
        } else {
          image = null;
        }
        Post.create({
          include: [
            {
              model: User,
              attributes: ["first_name", "last_name"],
            },
          ],
          message: req.body.message,
          imageUrl: image,
          UserId: user.id,
        }).then((post) => {
          res.status(201).json({ post, message: "Votre post est ajouté" });
        });
      } else {
        res.status(400).send({ error: "Erreur " });
      }
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
};
//modifier un message
exports.updatePost = async (req, res, next) => {
  try {
    let newImage;

    let post = await Post.findOne({ where: { id: req.params.id } });
    if (req.body.userId == post.UserId || req.body.userAdmin == true) {
      if (req.file) {
        newImage = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) console.log(err);
            else {
              console.log(`Deleted file: images/${filename}`);
            }
          });
        }
        post.imageUrl = newImage;
      }
      if (req.body.message) {
        post.message = req.body.message;
      }
      const newPost = await post.save({
        fields: ["message", "imageUrl"],
      });
      res.status(200).json({ newPost, message: "Le post a été modifié" });
    } else {
      res
        .status(401)
        .json({ message: "Vous n'etes pas autorisé à modifier le Post!" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// Supprimer un message
exports.deletePost = async (req, res, next) => {
  try {
    const postFound = await Post.findOne({
      where: { id: req.params.id },
    });
    if (req.body.userId == postFound.userId || req.body.userAdmin == true) {
      if (postFound.imageUrl != null) {
        const filename = postFound.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.destroy({ where: { id: req.params.id } });
        });
        res.status(200).json({ message: "Post supprimé !" });
      } else {
        await Post.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Post supprimé !" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Vous n'etes pas autorisé à supprimer le Post!" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
