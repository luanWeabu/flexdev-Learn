const Role = require('./Role.model');
const User = require('./User.model');
const UserRole = require('./UserRole.model');

/**
 * using Many to many
 * connected to User vs Role by through UserRole
 */
User.belongsToMany(Role, {through: UserRole});
Role.belongsToMany(User, {through: UserRole});
