const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data to the request object
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authenticate;
