import verify from '../src/verify';
import sign from '../src/sign';


describe('verify', () => {
    it('should verify and decode a valid token', () => {
        const secret = 'shhhh';

        const token = sign({payload: {name: 'foo'}, secret: secret});

        const verified = verify({token, secret});

        expect(verified.name).toBe('foo');

    })




    it('should throw if the signature is invalid', () => {
        const secretOne = 'shhhh';
        const secretTwo = 'secretTwo';

        const token = sign({payload: {name: 'foo'}, secret: secretOne});

        try {
            verify({token, secret: secretTwo});
        } catch (err) {
            expect(err.message).toBe('Invalid signature');
        }
    })

    it('should throw if the token is expired', () => {
        const secret = 'shhhh';

        const token = sign({
            payload: {name: 'foo'},
            secret,
            options: {
                expiresIn: -8.64e7
            }
    });

    try {
        verify({token, secret});
    } catch (err) {
        expect(err.message).toBe('Token expired');
    }
})

});