module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      content: DataTypes.STRING,
      attachement: DataTypes.STRING,
    },
    {}
  );
  comment.associate = function (models) {
    // associations can be defined here
    models.comment.belongsTo(models.post, {
      foreignKey: {
        allowNull: false,
      },
    });
    models.comment.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return comment;
};
