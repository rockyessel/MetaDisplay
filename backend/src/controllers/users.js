const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { s3, bucket_name, url, createFolder } = require('../utils/index.js');
const User = require('../model/users.js');

const GenToken = (address) => {
  return jwt.sign({ address }, `${process.env.JWT_SECRET_TOKEN}`, {
    expiresIn: '3d',
  });
};
const RegisterUser = async (request, response) => {
  try {
    console.log('body', request.body);
    console.log('file', request.file);
    const { address, name, username, email, password } = request.body;

    const empty =
      email === '' ||
      email === null ||
      email === undefined ||
      password === '' ||
      password === undefined ||
      password === null ||
      name === '' ||
      name === undefined ||
      name === null ||
      username === '' ||
      username === undefined ||
      username === null ||
      address === '' ||
      address === undefined ||
      address === null;
    //Todo Will use a validator lib to validate later

    if (empty)
      response.status(404).json({ msg: 'Check if any field is empty' });
    const isEmailAvailable = await User.findOne({ email });
    if (isEmailAvailable)
      response
        .status(404)
        .json({ error: true, msg: `User exist with this email:${email}` });
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const params = {
      Bucket: bucket_name,
      Key: `Users/${username}/${request.file.originalname}`,
      Body: request.file.buffer,
      ContentType: request.file?.mimetype,
    };

    await createFolder(`Users/${username}/`);

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const createdUser = await User.create({
      address,
      name,
      username,
      email,
      profile: `${url}Users/${username}/${request.file.originalname}`,
      password: hashed_password,
    });
    const token = GenToken(createdUser.address);
    response.status(201).json({
      success: true,
      address,
      name,
      username,
      email,
      profile: `${url}Users/${username}/${request.file.originalname}`,
      _id: createdUser._id,
      token,
    });

    if (!response.headersSent) {
      response.status(200).json({
        success: true,
        success: true,
        name,
        username,
        email,
        profile: `${url}User/${username}/${request.file.originalname}`,
        _id: createdUser._id,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: 'Interval problem' });
  }
};

const LoginUser = async (request, response) => {
  try {
    console.log('body', request.body);
    const { address, username, password } = request.body;

    const missingFields =
      username === '' ||
      username === null ||
      username === undefined ||
      password === '' ||
      password === undefined ||
      password === null ||
      address === '' ||
      address === undefined ||
      address === null;

    if (missingFields) {
      response.status(404).json({ msg: 'Email/Password cannot be blank' });
    }

    const foundUserWithAddress = await User.findOne({ address });

    if (!foundUserWithAddress || foundUserWithAddress === null) {
      response.status(404).json({
        error: true,
        msg: `No user was found with this address: ${address}`,
      });
    }

    if (foundUserWithAddress.username !== username) {
      response
        .status(404)
        .json({ error: true, msg: `Your username is incorrect.` });
    }

    const compare = await bcrypt.compare(
      password,
      foundUserWithAddress.password
    );

    if (!compare) {
      response.status(404).json({ error: true, msg: `Password is incorrect` });
    }

    const token = GenToken(foundUserWithAddress?._id);

    response.status(201).json({
      success: true,
      name: foundUserWithAddress.name,
      username: foundUserWithAddress.username,
      email: foundUserWithAddress.email,
      profile: foundUserWithAddress.profile,
      _id: foundUserWithAddress._id,
      token,
    });

    if (!response.headersSent) {
      response.status(201).json({
        success: true,
        name: foundUserWithAddress.name,
        username: foundUserWithAddress.username,
        email: foundUserWithAddress.email,
        profile: foundUserWithAddress.profile,
        _id: foundUserWithAddress._id,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ msg: 'Internal error', location: 'login' });
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
    response.status(500).json({ error: 'Could not delete asset.' });
  }
};

const FindUserAddress = async (request, response) => {
  try {
    const { address } = request.params;
    const findUserWithAddress = await User.findOne({ address });
    response.json(findUserWithAddress);
  } catch (error) {
    response.status(500).json({ error: 'Could not find user.' });
  }
};

module.exports = { RegisterUser, LoginUser, UserDelete, FindUserAddress };
