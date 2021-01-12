module.exports = (req, res, next) => {
  const { username, password } = req.body;

  function validName(userName) {
    return /^(?=.{1,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/gm.test(userName);
  }

  if (req.path === "/login") {
    if (![username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validName(name)) {
      return res.status(401).json("Invalid Username");
    }
  }

  next();
};