module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Transaction', {
    description: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false }
  });
};
