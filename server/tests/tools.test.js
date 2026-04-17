import request from 'supertest';
import app from '../src/app.js';
import University from '../src/models/University.js';

describe('Tool Endpoints', () => {
  let universityId;

  beforeEach(async () => {
    const uni = await University.create({
      name: 'Test Uni',
      country: 'USA',
      programs: [{ name: 'CS', tuitionFee: 40000 }]
    });
    universityId = uni._id;
  });

  it('should calculate ROI accurately', async () => {
    const res = await request(app)
      .post('/api/tools/roi-calculator')
      .send({
        country: 'USA',
        course: 'CS',
        universityId: universityId,
        currentSalary: 40000,
        workExp: 2
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.roiYears).toBeDefined();
    expect(typeof res.body.data.roiYears).toBe('number');
  });

  it('should calculate EMI accurately', async () => {
    const res = await request(app)
      .post('/api/tools/emi-calculator')
      .send({
        loanAmount: 100000,
        interestRate: 10,
        tenureMonths: 12
      });

    expect(res.statusCode).toEqual(200);
    // EMI for 100k at 10% for 12 months is approx 8792
    expect(res.body.data.emi).toBeGreaterThan(8700);
    expect(res.body.data.emi).toBeLessThan(8900);
  });
});
