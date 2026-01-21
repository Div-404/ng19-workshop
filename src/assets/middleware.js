// return 401 for any request to /protected
module.exports = (req, res, next) => {
  if (req.url.startsWith('/protected')) {
    return res.status(401).json({ message: 'Unauthorized - fake 401' });
  }
  next(); // let json-server handle the rest
};