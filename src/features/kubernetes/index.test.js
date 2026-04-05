// Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a proprietary
// license that can be found in the LICENSE file.

import express from 'express';
import request from 'supertest';

import { kubeRouter } from './index.js';

const app = express();

app.use(kubeRouter);

describe('Liveness probe', () => {
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/livez')
      .expect('Content-Type', /text\/html/)
      .expect('Content-Length', '2')
      .expect(200)
      .expect('OK');
  });
});

describe('Readiness probe', () => {
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/readyz')
      .expect('Content-Type', /text\/html/)
      .expect('Content-Length', '2')
      .expect(200)
      .expect('OK');
  });
});

describe('Metrics', () => {
  it('should return a 200 status code', async () => {
    await request(app)
      .get('/metrics')
      .expect('Content-Type', /text\/plain/)
      .expect(200);
  });
});
