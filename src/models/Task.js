module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Task', {
    name: { type: DataTypes.STRING, allowNull: false },
    dayOfWeek: { type: DataTypes.STRING, allowNull: false },
    occurrencesPerWeek: { type: DataTypes.INTEGER, defaultValue: 1 },
    startUserId: { type: DataTypes.INTEGER, allowNull: false }
  });
};
