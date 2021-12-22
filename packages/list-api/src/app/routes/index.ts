'use strict';

import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);

const routers = fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts';
  })
  .map((file) => {
    return require(path.join(__dirname, file));
  });

export default routers;
