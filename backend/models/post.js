module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
    },
    {}
  );
  post.associate = function (models) {
    // associations can be defined here
    models.post.hasMany(models.comment);
    models.post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return post;
};
