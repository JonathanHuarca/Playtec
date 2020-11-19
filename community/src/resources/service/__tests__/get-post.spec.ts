import request from 'supertest'
import connectDB from '../../../config/db'
import { app } from '../../../server'

describe('createPost', () => {
  test('create Post', async (done) => {
    beforeAll( async () => {
      await connectDB();
    });

    const data = {

      fname: "getPosts",
      service: "community",
      page: 1

    };

    request(app).post("/api").send(data)
      .then(response => {
        expect(response.status).toEqual(200)
        expect(response.body).toEqual([]) //
        done(); //Este especifica que ya han acabado nuestros tests
      });

    // afterAll(async(done) => {
    //   mongoDB.disconnect(done);
    // });
    
  done()
  })
})