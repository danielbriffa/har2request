export default class Fetch {
  url;
  method;
  headers;
  data;
  dataVar;

  constructor({ url, method, headers, data, dataVar }) {
    this.url = url;
    this.method = method;
    this.headers = headers.reduce((arr, header) => {
      return {
        ...arr,
        [header.name]: header.value
      };
    }, {});
    this.data = data;
    this.dataVar = dataVar;
  }

  toString() {
    const options = [];
    options.push(`method: '${this.method}'`);
    options.push(`headers: ${JSON.stringify(this.headers)}`);

    if (this.dataVar) {
      options.push(`body: JSON.stringify(${this.dataVar});`);
    } else if (this.data) {
      options.push(`body: ${JSON.stringify(this.data)}`);
    }

    return `fetch('${this.url}', {
        ${options.join(',\r\n')}
      });`;
  }
}
