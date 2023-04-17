const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3, bucket_name, url, createFolder } = require('../utils/index.js');
const Asset = require('../model/assets.js');
const User = require('../model/users.js');

const AssetPost = async (request, response) => {
  try {
    const user = request.user;
    await createFolder(`Assets/${user.username}/`);
    const params = {
      Bucket: bucket_name,
      Key: `Assets/${user.username}/${request.file.originalname}`,
      Body: request.file.buffer,
      ContentType: request.file?.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    const asset = await Asset.create({
      asset_url: `${url}Assets/${user.username}/${request.file.originalname}`,
    });

    response.status(201).json(asset);
  } catch (error) {
    console.log(error);
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
const GetAsset = async (request, response) => {
  try {
    const { id } = request.params;
    const found = await Asset.findById({ _id: id });
    console.log(found);
    response.status(200).json({ success: true, found });
  } catch (error) {
    response.status(500).json({ error: 'Could not find asset.' });
  }
};
const IncreaseAssetViewCount = async (request, response) => {
  try {
    // get
    const { id } = request.params;

    const found = await Asset.findByIdAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    );
    response.status(200).json({ success: true, found });
  } catch (error) {
    response
      .status(500)
      .json({ error: 'Could not find asset to increase count for.' });
  }
};
const AssetSave = async (request, response) => {
  try {
    const { id } = request.body;
    const user = request.user;

    const doesAssetExist = await Asset.findById({ _id: id });

    if (!doesAssetExist || doesAssetExist === null) {
      response.status(500).json({ error: 'Asset do not exist' });
    }

    // Find the user and check if the asset is already saved
    const foundUser = await User.findOne({ address: user.address });

    // Remove the existing entry from the saves array if it exists
    if (foundUser.saves.includes(id)) {
      await User.findOneAndUpdate(
        { address: user.address },
        { $pull: { saves: id } }
      );
    }

    // Find the id and check if the user is already saved
    const asset = await Asset.findById({ _id: id });

    // Remove the existing entry from the saves array if it exists
    if (asset.saves.includes(user.address)) {
      await Asset.findByIdAndUpdate(
        { _id: id },
        { $pull: { saves: user.address } },
        { new: true }
      );
    }

    // Find the asset and add the user address to its saves array
    const foundAsset = await Asset.findByIdAndUpdate(
      { _id: id },
      { $push: { saves: user.address } },
      { new: true }
    );

    // Add the asset ID to the user's saves array
    await User.findOneAndUpdate(
      { address: user.address },
      { $push: { saves: id } }
    );

    response.status(200).json({ success: true, foundAsset });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Could not save asset.' });
  }
};

module.exports = {
  AssetPost,
  AssetDelete,
  GetAsset,
  IncreaseAssetViewCount,
  AssetSave,
};
