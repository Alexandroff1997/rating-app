import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { disconnect, Types } from 'mongoose';
import { CreateReviewDto } from '../../src/review/dto/create-review.dto';
import { REVEIEW_NOT_FOUND } from '../../src/review/common/review-constants';

const productId = new Types.ObjectId().toHexString();
const fakeProductId = new Types.ObjectId().toHexString();

const reviewDto: CreateReviewDto = {
  name: 'name',
  title: 'title',
  description: 'description',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(reviewDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
      });
  });

  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...reviewDto, rating: 0 }) // bad rating
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
      });
  });

  it('/review/byProduct/:productId (GET) - success', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/byProduct/:productId (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${fakeProductId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/:id (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete(`/review/${createdId}`)
      .expect(200);
  });

  it('/review/:id (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete(`/review/${fakeProductId}`)
      .expect(404, {
        statusCode: 404,
        message: REVEIEW_NOT_FOUND,
      });
  });

  afterAll(() => {
    disconnect();
  });
});
