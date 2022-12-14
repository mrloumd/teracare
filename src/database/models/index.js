import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { dbConfig } from '../../config';

const basename = path.basename(__filename);
const db = {};
const { database, username, password, options } = dbConfig;

const sequelize = new Sequelize(database, username, password, options);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
