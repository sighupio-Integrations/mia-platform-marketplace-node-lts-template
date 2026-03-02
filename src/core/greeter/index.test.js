// Copyright (c) 2017-present SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a proprietary
// license that can be found in the LICENSE file.

import { greet } from './index.js';

test('Greet in German', () => {
  expect(greet('de')).toBe('Hallo Welt!');
});

test('Greet in Spanish', () => {
  expect(greet('es')).toBe('¡Hola Mundo!');
});

test('Greet in French', () => {
  expect(greet('fr')).toBe('Bonjour le monde!');
});

test('Greet in Italian', () => {
  expect(greet('it')).toBe('Ciao Mondo!');
});

test('Greet in English', () => {
  expect(greet()).toBe('Hello World!');
});
