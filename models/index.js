// import fs from 'fs';
// import path from 'path';
// import { Sequelize, DataTypes } from 'sequelize';
// import { config as dotenvConfig } from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// dotenvConfig();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const db = {};

// const sequelize = new Sequelize({
//   database: process.env.DB,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres',
//   logging: true,
// });

// const importModels = async () => {
//   const modelFiles = fs
//     .readdirSync(__dirname)
//     .filter(
//       (file) =>
//         file.indexOf('.') !== 0 &&
//         file.slice(-3) === '.js' &&
//         file !== 'index.js' &&
//         file.indexOf('.test.js') === -1
//     );

//   for (const file of modelFiles) {
//     console.log('Loading model file:', file);
//     const model = (await import(path.join(__dirname, file))).default;
//     db[model.name] = model(sequelize, DataTypes);
//   }
// };

// importModels().then(() => {
//   Object.keys(db).forEach((modelName) => {
//     if (db[modelName].associate) {
//       db[modelName].associate(db);
//     }
//   });

//   db.sequelize = sequelize;
//   db.Sequelize = Sequelize;

//   // Now, you can add any additional code you need to run after loading the models.

//   // For example, you can define associations between models here, or create tables if necessary.

//   // Example:
//   // db.User.hasMany(db.Post);
//   // db.Post.belongsTo(db.User);

//   // Alternatively, you can export the `db` object for use in other modules.
//   // export default db;
// });

// // Rest of your code...

// // db.sequelize.sync({ force: true, alter: true }).then(() => {
// //   console.log('Synced');
// //   // Below function will check if roles and admin created or not, if not then it will create admin roles otherwise it will do nothing
// //   //createAdmin();
// //   //   createRoles(user_roles);
// //   //tester();
// // });
// (async () => {
//   try {
//     await db.sequelize.sync({ force: true, alter: true });
//     console.log('Synced');
//     // Other code to execute after syncing
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// })();

// export default db;

import { Sequelize, DataTypes } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const db = {};

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: true,
});

import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const importModels = async () => {
  const modelFiles = readdirSync(__dirname).filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file.slice(-3) === '.js' &&
      file !== 'index.js' &&
      file.indexOf('.test.js') === -1
  );

  for (const file of modelFiles) {
    console.log('Loading model file:', file);
    const model = (await import(`file://${join(__dirname, file)}`)).default;
    db[model.name] = model(sequelize, DataTypes);
  }
};

importModels().then(() => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  (async () => {
    try {
      await db.sequelize.sync({ force: true, alter: true });
      console.log('Synced');
      // Other code to execute after syncing
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  })();
});

export default db;
