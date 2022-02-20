import 'dotenv/config';
import Admin from '../../src/entities/Admin';

test('it should be ok', () => {
    const admin = new Admin('teste@gmail.com', 'test', 'test1234');

    expect(admin.name).toEqual('test');
});
