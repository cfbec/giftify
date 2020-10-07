import jwt from 'jsonwebtoken';

require('dotenv').config();

class JwtService {

  createToken(payload, expiresIn = '1d') {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

}

const jwtService = new JwtService();

module.exports = jwtService;
