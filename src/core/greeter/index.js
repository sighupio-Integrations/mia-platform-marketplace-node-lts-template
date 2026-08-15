/**
 * Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a proprietary
 * license that can be found in the LICENSE file.
 */

export const greet = lang => {
  if (lang === 'de') {
    return `Hallo Welt!`;
  }

  if (lang === 'es') {
    return `¡Hola Mundo!`;
  }

  if (lang === 'fr') {
    return `Bonjour le monde!`;
  }

  if (lang === 'it') {
    return `Ciao Mondo!`;
  }

  return `Hello World!`;
};
