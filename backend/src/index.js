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


const a = () => {
  console.log(
    process.env.BUCKET_NAME,
    process.env.BUCKET_REGION_NAME,
    process.env.AWS_IAM_META_DISPLAY_ACCESS_KEY,
    process.env.AWS_IAM_META_DISPLAY_ACCESS_SECRET_KEY,
    process.env.META_DISPLAY_S3_BASE_URL
  );
};

// @desc Routes
app.use('/v1/assets', require('./routes/assets'));
app.use('/v1/users', require('./routes/users'));
// @desc Server Port
app.listen(PORT, () => {
  console.log('Listening on port');
});

module.exports = a