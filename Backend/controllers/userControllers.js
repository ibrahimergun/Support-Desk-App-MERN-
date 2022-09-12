const registerUser = (req, res) => {
  res.status(201).send('Register User page');
};

const loginUser = (req, res) => {
  res.status(201).send('Login User');
};

const getMe = (req, res) => {
  res.status(201).send('About me');
};

module.exports = { registerUser, loginUser, getMe };
