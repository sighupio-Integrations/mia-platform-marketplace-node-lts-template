/**
 * Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a proprietary
 * license that can be found in the LICENSE file.
 */
import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

export const kubeRouter = express.Router();

kubeRouter.get('/livez', (_req, res) => res.send('OK'));

kubeRouter.get('/readyz', (_req, res) => res.send('OK'));

kubeRouter.get('/metrics', async (_req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});
