const express = require("express");
const app = express();
const db = require("./models");

const path = require("path");

const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// {force:true}
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
