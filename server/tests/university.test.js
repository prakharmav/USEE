import request from 'supertest';
import app from '../src/app.js';
import University from '../src/models/University.js';

describe('University Endpoints', () => {
  beforeEach(async () => {
    await University.create([
      { name: 'University A', country: 'USA', ranking: 10, tuitionFees: { international: 50000 } },
      { name: 'University B', country: 'UK', ranking: 100, tuitionFees: { international: 30000 } },
      { name: 'University C', country: 'USA', ranking: 300, tuitionFees: { international: 20000 } },
    ]);
  });

  it('should filter by country', async () => {
    const res = await request(app).get('/api/universities?country=USA');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.universities.length).toBe(2);
  });

  it('should filter by ranking', async () => {
    const res = await request(app).get('/api/universities?maxRanking=50');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.universities.length).toBe(1);
    expect(res.body.data.universities[0].name).toBe('University A');
  });
});
