const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDatabase } = require('./utils/config');
const PORT = process.env.PORT || 4000;

const app = express();
connectDatabase();
dotenv.config({ path: '.env' });

// @desc Default Middleware
app.use(cors()); // Later set it to developement and production env.
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @desc Routes
app.use('/v1/assets', require('./routes/assets'));
app.use('/v1/users', require('./routes/users'));
// @desc Server Port
app.listen(PORT, () => {
  console.log('Listening on port');
});
