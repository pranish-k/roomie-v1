module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Payment', {
    amount: { type: DataTypes.FLOAT, allowNull: false }
  });
};
