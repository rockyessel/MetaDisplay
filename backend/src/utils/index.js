const multer = require('multer');
const { S3Client } = require('@aws-sdk/client-s3');

const url = process.env.META_DISPLAY_S3_BASE_URL;
const bucket_name = process.env.BUCKET_NAME;
const bucket_region_name = process.env.BUCKET_REGION_NAME;
const aws_iam_meta_display_access_key =
  process.env.AWS_IAM_META_DISPLAY_ACCESS_KEY;
const aws_iam_meta_display_access_secret_key =
  process.env.AWS_IAM_META_DISPLAY_ACCESS_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: aws_iam_meta_display_access_key,
    secretAccessKey: aws_iam_meta_display_access_secret_key,
  },
  region: bucket_region_name,
});

const storageFileEngine = multer.memoryStorage();
const asset_upload = multer({ storage: storageFileEngine });

module.exports = { asset_upload, s3, bucket_name, url };
