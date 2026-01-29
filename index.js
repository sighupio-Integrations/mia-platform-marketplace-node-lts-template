/**
 * Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a proprietary
 * license that can be found in the LICENSE file.
 */
import express from 'express';

import { homeRouter } from './src/features/home/index.js';
import { kubeRouter } from './src/features/kubernetes/index.js';

const app = express();
const port = 3000;

app.use(homeRouter);
app.use(kubeRouter);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`),
);
