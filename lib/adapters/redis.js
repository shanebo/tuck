class Redis {

  constructor({ url }) {
    const { createClient } = require('redis');
    this.client = createClient({ url });
    this.client.on('error', console.log);
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
