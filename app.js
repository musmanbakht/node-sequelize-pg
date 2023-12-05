import express, { json } from 'express';
const app = express();
import path from 'path';
const port = 5005;
import User from './models/User.js';
// const db = require('./models');
import db from './models/index.js';

// body parser
const bodyParser = json();
app.use(bodyParser);

// cors
import cors from 'cors';
app.use(cors());

// routes
// const routes = require('./routes');
// const tester = require('./test');

// app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
