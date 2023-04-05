const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config({ path: '.env' });

// @desc Default Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @desc Routes
app.use('/v1/assets', require('./routes/assets'));

// @desc Server Port
app.listen(PORT, () => {
  console.log('Listening on port');
});
