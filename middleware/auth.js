const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  token = ''
  if(authHeader){
    authArray = authHeader.split(' ')
    token = authArray[1]
  }
//   const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      } else {
        req.user = payload;
        next();
      }
    });
  }
};
