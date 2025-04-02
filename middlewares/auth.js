const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  try {
    const fullToken = req.headers.authorization // come with token
    const token = fullToken?.split(' ')[1]; // split token from first space
    if(!token) res.status(403).send("Invalid Token"); // if not exist token
    const decodedToken = jwt.verify(token,'secretKey') // decode token to json
    req.user = decodedToken; // put json data in req.user "user" any name can change put will use it in controller
    next(); // mean finish middle ware and success
  } catch (error) {
    console.log(error);
    res.status(400).send("Invalid Token");
  }
}

