const jwt = require('jsonwebtoken');
const secrets = require('../../../config/secrets.json');
const config = require(`../../../config/${(process.env.NODE_ENV || 'development')}.json`);
const {
    User,
} = require('../../../models/user');
const moongose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid user authentication token', () => {
        const payload = {
            _id: new moongose.Types.ObjectId().toHexString(),
            isAdmin: true
        };
        const user = new User(payload);
        const userToken = user.generateAuthToken();
        const decodedPayload = jwt.verify(userToken, secrets[config.jwtPrivateKey]);
        expect(decodedPayload).toMatchObject(payload);
    });
});