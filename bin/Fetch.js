export default class Fetch {
  url;
  method;
  headers;
  data;

  constructor(url, method, headers, data) {
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.data = data;
  }

  toString() {
    const payload = {
      method: this.method,
      headers: this.headers,
      body: this.data
    };
    return `fetch('${this.url}', ${JSON.stringify(payload)})`;
  }
}
