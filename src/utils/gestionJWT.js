import jwt from 'jsonwebtoken';

export const generateJWT = (object, res) => {
    const token = jwt.sign(object, process.env.SECRET_KEY, { expiresIn: '1h' });
    return {token: token};
  }