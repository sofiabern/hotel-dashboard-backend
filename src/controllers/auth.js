import { createUser, logoutUser, loginUser } from '../services/auth.js';

export const signupUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.json({
    status: 200,
    message: 'User is created!',
    data:  user ,
  });
};

export const loginUserController = async (req, res) => {
  const token = await loginUser(req.body);

  res.json({
    status: 200,
    message: 'User is logged in!',
    data: {
      token,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { _id } = req.user;
  await logoutUser(_id, { token: '' });
  res.status(200).json({
    status: 200,
    message: 'Logout successful',
  });
};

export const getCurrentContoller = async (req, res) => {
  const { name, email } = req.user;

  res.json({
    name,
    email,
  });
};
