const jwt = require("jsonwebtoken");

const logon = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ msg: "Please provide name and password" });
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  res.status(200).json({ msg: "success", token });
};

const getMessage = async (req, res) => {
  res.status(200).json({ msg: `Hello ${req.user.name}` });
};

module.exports = { logon, getMessage };
