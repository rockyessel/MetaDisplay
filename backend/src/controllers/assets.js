const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3, bucket_name, url, createFolder } = require('../utils/index.js');
const User = require('../model/users.js');

const AssetPost = async (request, response) => {
  try {
    const user = request.user
    await createFolder(`Assets/${user.username}/`);
    const params = {
      Bucket: bucket_name,
      Key: `Assets/${user.username}/${request.file.originalname}`,
      Body: request.file.buffer,
      ContentType: request.file?.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    response.status(201).json({ asset: `${url}Assets/${user.username}/${request.file.originalname}` });
  } catch (error) {
    response.status(500).json({ error: 'Could not upload asset.' });
  }
};

const AssetDelete = async (request, response) => {
  try {
    const params = {
      Bucket: bucket_name,
      Key: request.params.assetName,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    response.status(200).json({ success: true });
  } catch (error) {
    response.status(500).json({ error: 'Could not delete asset.' });
  }
};

module.exports = { AssetPost, AssetDelete };
