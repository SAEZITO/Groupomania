module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
    Post.hasMany(models.Comment);
  };

  return Post;
};
