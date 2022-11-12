import supertest from 'supertest';
import server from '../index';

const request = supertest(server);
describe('test server', () => {
  it('check if server is up', (done) => {
    request.get('/').then((response) => {
      expect(response.status).toBe(200);
    });
    done();
  });
});
