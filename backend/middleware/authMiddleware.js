const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
  return 
  res.status(403).json({ msg: 'Access denied. Admin only.' });
  }
  next();
};