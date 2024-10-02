const request = require('supertest');
const app = require('../server');
const db = require('../models/index');

describe('GET /api/cyber_school/students', () => {

  beforeAll(async () => {
    await db.sequelize.sync({ force: false });

    // Add test students
    const response = await db.Student.create(
      {
        first_name: 'Jane',
        last_name: 'Doe',
        gender: 'F',
        date_of_birth: '2005-05-10',
        parents_contact: '0700000000',
        physical_address: 'Kampala',
        category: 'Day',
        class: 'P6',
        status: true,
        school_fees: 750000,
        initial_payment: 500000
      });

      await db.Finance.create({student_id: response.student_id, fees: 750000});
  });

  it('should retrieve students based on criteria', async () => {
    const response = await request(app)
      .get('/api/cyber_school/students?first_name=Jane');

    expect(response.statusCode).toBe(200);
    expect(response.body[0].first_name).toBe('Jane');
    expect(response.body[0].last_name).toBe('Doe');
  });

  it('should return 404 when no student matches the criteria', async () => {
    const response = await request(app)
      .get('/api/cyber_school/students?first_name=NonExistent');

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('No students found with the provided criteria');
  });
});
