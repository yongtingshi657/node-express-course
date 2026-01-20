const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id, name } = decoded;

    console.log(name);

    req.user = { id, name };

    console.log('Verify Token Successfully')

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Authentication Failed" });
  }
};

module.exports = authenticationMiddleware;
