module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
  });
  User.associate = function (models) {
      User.hasMany(models.Review,{
          onDelete: "cascade"
      })
  };
  return User;
};
