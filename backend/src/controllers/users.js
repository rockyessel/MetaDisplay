const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { s3, bucket_name, url, createFolder } = require('../utils/index.js');
const User = require('../model/users.js');

const GenToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.JWT_SECRET_TOKEN}`, {
    expiresIn: '3d',
  });
};
const RegisterUser = async (request, response) => {
  try {
    console.log('body', request.body);
    console.log('file', request.file);
    const { name, username, email, password } = request.body;

    const empty =
      email === '' ||
      email === null ||
      email === undefined ||
      password === '' ||
      password === undefined ||
      password === null;
    name === '' || name === undefined || name === null;
    username === '' || username === undefined || username === null;
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
      name,
      username,
      email,
      profile: `${url}Users/${username}/${request.file.originalname}`,
      password: hashed_password,
    });
    const token = GenToken(createdUser._id);
    response.status(201).json({
      success: true,
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
    const { email, password } = request.body;

    const empty =
      email === '' ||
      email === null ||
      email === undefined ||
      password === '' ||
      password === undefined ||
      password === null;

    if (empty) {
      response.status(404).json({ msg: 'Email/Password cannot be blank' });
    }

    const isEmailAvailable = await User.findOne({ email });

    if (!isEmailAvailable || isEmailAvailable === null) {
      response
        .status(404)
        .json({ error: true, msg: `User exist with this email:${email}` });
    }

    const compare = await bcrypt.compare(password, `${isEmailAvailable?.password}`);

    if (!compare) {
      response.status(404).json({ error: true, msg: `Password is incorrect` });
    }

    const token = GenToken(isEmailAvailable?._id);

    response.status(201).json({
      success: true,
      name: isEmailAvailable.name,
      username: isEmailAvailable.username,
      email: isEmailAvailable.email,
      profile: isEmailAvailable.profile,
      _id: isEmailAvailable._id,
      token,
    });
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

module.exports = { RegisterUser, LoginUser, UserDelete };
