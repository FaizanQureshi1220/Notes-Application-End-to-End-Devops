// Server/models/index.js
const sequelize = require('../db');
const User = require('./User');
const Note = require('./Note');

// Associations
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });

async function initDb(retries = 10, delayMs = 5000) {
  while (retries > 0) {
    try {
      console.log(' Trying to connect DB... Retries left:', retries);

      await sequelize.authenticate();
      console.log(' DB connection OK');

      await sequelize.sync(); // create / sync tables from models
      console.log(' DB synced (schema ensured)');

      return; // success, exit function
    } catch (err) {
      console.error(' DB init failed:', err.message);
      retries -= 1;

      if (retries === 0) {
        console.error(' Out of retries, giving up');
        throw err;
      }

      // wait a bit and retry
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }
}

module.exports = {
  sequelize,
  User,
  Note,
  initDb,
};
