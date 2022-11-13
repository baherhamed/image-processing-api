import server from '../../index';

import request from 'supertest';

describe('Unit testing the image route', function () {
  it('should return 404 status because route wrong', async function () {
    const response = await request(server)
      .get('/imagesa');
    expect(response.status).toBe(404);

  });
  it('should return 400 status because image not exisit', async function () {
    const response = await request(server)
      .get('/api/images?filename=fajord&width=100&height=500');
    expect(response.status).toBe(400);
  });

  it('should return 400 status because image width not number', async function () {
    const response = await request(server)
      .get('/api/images?filename=fjord&width=100&height=500a');
    expect(response.status).toBe(400);

  });

  it('should return 200 status because image exisit', async function () {
    const response = await request(server)
      .get('/api/images?filename=fjord&width=100&height=500');
    expect(response.status).toBe(200);

  });
});