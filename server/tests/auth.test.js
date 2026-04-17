import request from 'supertest';
import app from '../src/app.js';

describe('Auth Endpoints', () => {
  const user = {
    name: 'Test user',
    email: 'test@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(user);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user.email).toBe(user.email);
  });

  it('should login an existing user', async () => {
    // Register first
    await request(app).post('/api/auth/register').send(user);

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
    expect(res.body.token).toBeDefined();
  });

  it('should get current user info with valid token', async () => {
    // Register & Login
    await request(app).post('/api/auth/register').send(user);
    const loginRes = await request(app).post('/api/auth/login').send({
      email: user.email,
      password: user.password,
    });
    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.user.email).toBe(user.email);
  });
});
