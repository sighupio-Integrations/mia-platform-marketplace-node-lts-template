/**
 * Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a proprietary
 * license that can be found in the LICENSE file.
 */
import express from 'express';

import { greet } from '../../core/greeter/index.js';

export const homeRouter = express.Router();

homeRouter.get('/', (req, res) =>
  res
    .setHeader('Content-Type', 'application/json')
    .send(JSON.stringify({ message: greet(req.query.lang) })),
);
