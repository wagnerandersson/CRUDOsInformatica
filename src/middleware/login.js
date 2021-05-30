const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_KEY);
    console.log(decode);
    req.users_id = decode.users_id;
    next();
  } catch (error) {
    return res.status(401).send({ erro: "Falha na autenticação" });
  }
};
