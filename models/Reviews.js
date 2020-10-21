module.exports = function (sequelize, DataTypes){
    var Review  = sequelize.define("Review", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          review: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          rating: {
              type: DataTypes.FLOAT,
              allowNull: false
          },
          players: {
              type: DataTypes.INTEGER,
              allowNull: false
          }
    });
    Review.associate = function (models){
    Review.belongsTo(models.User);
    };
    return Review;
    }