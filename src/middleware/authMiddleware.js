// const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

// exports.protect = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };

// exports.adminOnly = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ error: 'Admins only' });
//   }
//   next();
// };


// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

exports.protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only' });
  }
  next();
};
