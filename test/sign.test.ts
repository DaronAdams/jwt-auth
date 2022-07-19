import sign from '../src/sign';

describe('signature', () => {
    it('should produce different signatures for different payloads', () => {
        
        const secret = "shhh"

        const jwtOne = sign({
            payload: {name: 'foo'},
            secret,
            options: { expiresIn: 8.64e7}, // one day in milliseconds

        }).split('.')[2];

        const jwtTwo= sign({
            payload: {name: 'foo'},
            secret: `${secret}-13323`,
            options: { expiresIn: 8.64e7}, // one day in milliseconds

        }).split('.')[2];

        expect(jwtOne).not.toBe(jwtTwo);

    });

    it('should add the expiry to the payload', () => {
        const secret = "shhh";

        const jwtOne = sign({
            payload: {name: 'foo'},
            secret,
            options: { expiresIn: 8.64e7}, // one day in milliseconds

        }).split('.')[1];

        expect(typeof JSON.parse(atob(jwtOne)).exp).toBe('number');
    })
})