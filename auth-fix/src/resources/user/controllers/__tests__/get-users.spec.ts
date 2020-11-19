import request from 'supertest'
import connectDB from '../../../../../src/config/db'
import { app } from '../../../../server'

describe('getUsers', () => {
  test('get users', async (done) => {
    beforeAll( async () => {
      await connectDB();
    });

    const data = {
      fname: "getUsers",
      service: "users"
    };

    request(app).post("/api").send(data)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body).toEqual([])
        done();
      });

    // afterAll(async(done) => {
    //   mongoDB.disconnect(done);
    // });
    
  done()
  })
})
