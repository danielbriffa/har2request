import Fetch from './Classes/Fetch.js';
import Object from './Classes/Object.js';
import { generateString, convertAsArray } from './helpers.js';
import { headerCleanupNames } from './constants.js';

export function processEntry({ argv, entry }) {
  let formObject;
  let formVarName;
  let headers = entry.request.headers;

  const response = [];

  // Clean up any unwanted headers from the requests
  // Merge any arguments with the default set list
  if (argv.cleanHeaders) {
    let cleanHeaders = convertAsArray(argv.cleanHeaders);

    const headersToRemove = [...headerCleanupNames, ...cleanHeaders];

    let tempHeaders = headers.filter((x) => !headersToRemove.includes(x.name));

    headers = tempHeaders;
  }

  // If we need to output the body in a variable before
  // lets generate a random string as a var name, and set accordingly
  if (argv.withVars && entry.request.postData?.text) {
    formVarName = generateString(8);
    formObject = new Object({
      jsonString: entry.request.postData?.text,
      varType: 'const',
      varName: formVarName
    });
    response.push(formObject.toString());
  }

  // Create the actual request
  let fetch = new Fetch({
    url: entry.request.url,
    method: entry.request.method,
    headers,
    dataVar: argv.withVars && formObject ? formVarName : undefined,
    data: !argv.withVars && entry.request.postData?.text
  }).toString();
  response.push(fetch.toString());

  return response;
}
