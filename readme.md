# Tuck

A lightweight key-value store with backend adapters.

## Install

`npm install tuck`

## Usage

``` js
const Tuck = require('tuck');
const cache = new Tuck({
  url: 'redis://127.0.0.1:6379',
  namespace: 'api',
  serialize: JSON.stringify,
  deserialize: JSON.parse
});

await cache.set('foo', { hello: 'world' });
await cache.has('foo'); // true
await cache.get('foo'); // { hello: 'world' }
await cache.delete('foo');
```
