#!/usr/bin/env node

import fs from 'fs';
import { resourceTypes } from './constants.js';
import Fetch from './Fetch.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

if (!argv.file) {
  throw Error('Please specify a har file');
}
if (!argv.output) {
  throw Error('Please specify an output location for the js file');
}

//lets parse it correctly
let ignoreUrl;
if (argv.ignoreUrl) {
  if (typeof argv.ignoreUrl === 'string') {
    ignoreUrl = argv.ignoreUrl.split(',');
  } else {
    ignoreUrl = argv.ignoreUrl;
  }
}

fs.readFile(argv.file, { encoding: 'utf-8' }, function (err, data) {
  if (!err) {
    const xhrList = [];
    let parsedData = JSON.parse(data);
    //get only specified resource types,we shall discard all the rest
    const entries = parsedData?.log?.entries?.filter(
      (x) =>
        resourceTypes.includes(x._resourceType) &&
        ignoreUrl &&
        !ignoreUrl.some((y) => x.request.url.includes(y)) &&
        argv.ignoreMethod &&
        x.request.method.toUpperCase() !== argv.ignoreMethod.toUpperCase()
    );

    entries.forEach((entry) => {
      xhrList.push(
        new Fetch(
          entry.request.url,
          entry.request.method,
          entry.request.headers,
          entry.request.postData?.text
        ).toString()
      );
    });

    // writeFile function with filename, content and callback function
    fs.writeFile(argv.output, xhrList.join('\r\n\r\n'), function (err) {
      if (err) throw err;
      console.log('Wohhooo');
    });
  } else {
    console.log(err);
  }
});
