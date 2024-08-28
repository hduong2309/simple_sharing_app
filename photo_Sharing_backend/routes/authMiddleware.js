const jwt = require("jsonwebtoken");
const secretKey = "HoangDuong2309";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (typeof token !== "undefined") {
    jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
      if (err) {
        res.status(403).send("Invalid token");
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = verifyToken;
