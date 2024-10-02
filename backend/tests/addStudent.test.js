const request = require('supertest');
const app = require('../server');
const db = require('../models/index');

describe('POST /api/cyber_school/students', () => {
  
  beforeAll(async () => {
    // database setup
    await db.sequelize.sync({ force: false }); // Sync database
  });

  it('should successfully add a student', async () => {
    const studentData = {
      first_name: 'John',
      last_name: 'Doe',
      gender: 'M',
      date_of_birth: '2005-05-10',
      parents_contact: '0700000000',
      physical_address: 'Kampala',
      category: 'Day',
      class: 'P6',
      school_fees: 500000,
      initial_payment: 100000
    };

    const response = await request(app)
      .post('/api/cyber_school/students')
      .send(studentData);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.first_name).toBe(studentData.first_name);
    expect(response.body.last_name).toBe(studentData.last_name);
  });

  it('should return validation error for missing fields', async () => {
    const invalidStudentData = {
      last_name: 'Doe',
      gender: 'M',
      category: 'Day',
      class: 'P6',
      school_fees: 500000
    };

    const response = await request(app)
      .post('/api/cyber_school/students')
      .send(invalidStudentData);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain("\"first_name\" is required");
  });
});
