const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed. You must be logged in",
    });
    return;
  }
  const token = authorizationHeader.split("Bearer ")[1];
  try {
    const checkToken = jwt.verify(token, process.env.jwt_key);
    req.user = checkToken;
    //console.log(checkToken);
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: "Authorization failed. Invalid token",
    });
    return;
  }
  next();
};
module.exports = auth;
