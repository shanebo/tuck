class Redis {

  constructor({ url }) {
    const { createClient } = require('redis');
    this.client = createClient({ url });
    this.client.on('error', (err) => console.log('redis client error', err));
    this.client.on('connect', () => console.log('redis client connected'));
    this.client.on('reconnecting', () => console.log('redis client reconnecting'));
    this.client.on('ready', () => console.log('redis client ready'));
    this.client.connect();
  }

  has(key) {
    return this.client.exists(key);
  }

  get(key) {
    return this.client.get(key);
  }

  set(key, value, ttl) {
    return this.client.set(key, value, {
      ...ttl && {
        EX: ttl
      }
    });
  }

  delete(key) {
    return this.client.del(key);
  }
}


module.exports = Redis;
