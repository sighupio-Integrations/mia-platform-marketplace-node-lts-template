// Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a proprietary
// license that can be found in the LICENSE file.

import express from 'express';
import request from 'supertest';

import { homeRouter } from './index.js';

const app = express();

app.use(homeRouter);

describe('Home page', () => {
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/')
      .expect('Content-Type', /application\/json/)
      .expect('Content-Length', '26')
      .expect(200)
      .expect('{"message":"Hello World!"}');
  });
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/?lang=it')
      .expect('Content-Type', /application\/json/)
      .expect('Content-Length', '25')
      .expect(200)
      .expect('{"message":"Ciao Mondo!"}');
  });
});
