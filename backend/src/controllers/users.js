const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3, bucket_name, url } = require('../utils/index.js');

const UserPost = async (request, response) => {
  try {
    const params = {
      Bucket: bucket_name,
      Key: request.file.originalname,
      Body: request.file.buffer,
      ContentType: request.file?.mimetype,
    };

    createFolder('User');

    const command = new PutObjectCommand(params);
    await s3.send(command);

    response.status(201).json({ asset: `${url}${request.file.originalname}` });
  } catch (error) {
    response.status(404).json({ error: 'Could not upload asset.' });
  }
};

const UserDelete = async (request, response) => {
  try {
    const params = {
      Bucket: bucket_name,
      Key: request.params.assetName,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);

    response.status(200).json({ success: true });
  } catch (error) {
    response.status(404).json({ error: 'Could not delete asset.' });
  }
};

async function createFolder(folder_name) {
  const params = {
    Bucket: bucket_name,
    Key: `${folder_name}/`,
    Body: 0,
  };

  console.log('s3', s3);

  try {
    const command = new PutObjectCommand(params);
    const result = await s3.send(command);
    console.log(`Folder created successfully: ${result.Location}`);
  } catch (error) {
    console.error(`Error creating folder: ${error.message}`);
  }
}

module.exports = { UserPost, UserDelete };
