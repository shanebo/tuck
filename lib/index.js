class Tuck {

  constructor(opts = {}) {
    Object.assign(this, {
      ttl: null,
      namespace: '',
      serialize: JSON.stringify,
      deserialize: JSON.parse,
      ...opts
    });

    const [ adapterName ] = this.url.split(':');
    const Backend = require(`./adapters/${adapterName}`);

    this.store = new Backend({
      url: this.url
    });
  }

  key(k) {
    return this.namespace
      ? `${this.namespace}:${k}`
      : k;
  }

  async has(k) {
    const key = this.key(k);
    return this.store.has(key);
  }

  async get(k) {
    const key = this.key(k);
    const v = await this.store.get(key);
    return v ? this.deserialize(v) : undefined;
  }

  async set(k, v, ttl) {
    const key = this.key(k);
    const value = this.serialize(v);
    return this.store.set(key, value, ttl || this.ttl);
  }

  async delete(k) {
    const key = this.key(k);
    return this.store.delete(key);
  }
}


module.exports = Tuck;
