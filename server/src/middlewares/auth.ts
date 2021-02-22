import expressJwt from 'express-jwt';
import config from '../config';

const JWT_KEY = config.JWT_KEY.replace(/\\n/gm, '\n');

const authenticateToken = expressJwt({
    algorithms: ['RS256'],
    secret: JWT_KEY,
});
export default authenticateToken;