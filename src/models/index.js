const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = require('./User')(sequelize, DataTypes);
const Group = require('./Group')(sequelize, DataTypes);
const GroupUser = require('./GroupUser')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);
const Task = require('./Task')(sequelize, DataTypes);

// Associations
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

// Transactions (expenses)
Group.hasMany(Transaction);
Transaction.belongsTo(Group);
Transaction.belongsTo(User, { as: 'payer' });

// Payments (settlements)
Group.hasMany(Payment);
Payment.belongsTo(Group);
Payment.belongsTo(User, { as: 'payer' });
Payment.belongsTo(User, { as: 'payee' });

// Chores
Group.hasMany(Task);
Task.belongsTo(Group);
Task.belongsTo(User, { as: 'starter', foreignKey: 'startUserId' });

module.exports = { sequelize, User, Group, GroupUser, Transaction, Payment, Task };
