module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  user.associate = function (models) {
    models.user.hasMany(models.post);
  };
  user.associate = function (models) {
    models.user.hasMany(models.comment);
  };
  return user;
};
