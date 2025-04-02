import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Permission denied. Admin role required.' });
    }

    req.user = decoded; 
    next(); 
  });
};

export const isUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Permission denied. User role required.' });
    }

    req.user = decoded; 
    next(); 
  });
};

export const isAuthenticated = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded; 
    next(); 
  });
};