module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Group', {
    name: { type: DataTypes.STRING, allowNull: false },
    code: { type: DataTypes.STRING(10), unique: true, allowNull: false }
  });
};
