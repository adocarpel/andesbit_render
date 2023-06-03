//const jwt = require('jsonwebtoken')


// create token and saving that in cookies
const sendToken = (user, statusCode, res) => {
  //const token = user.getJwtToken();
  const token = user.getJwtToken();
  /*
  const token =jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  */
  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

////module.exports = sendToken;


// create token and saving that in cookies
/*
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
*/
module.exports = sendToken;
