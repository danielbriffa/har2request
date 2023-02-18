#!/usr/bin/env node

import fs from 'fs';
import { resourceTypes } from './constants.js';
import { processEntry } from './process.js';
import { convertAsArray } from './helpers.js';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import beautify from 'js-beautify/js/index.js';

const argv = yargs(hideBin(process.argv)).argv;

if (!argv.file) {
  throw Error('Please specify a har file');
}
if (!argv.output) {
  throw Error('Please specify an output location for the js file');
}

//lets parse the arguments correctly
let ignoreUrl, ignoreMethod;
if (argv.ignoreUrl) {
  ignoreUrl = convertAsArray(argv.ignoreUrl);
}
if (argv.ignoreMethod) {
  ignoreMethod = convertAsArray(argv.ignoreMethod);
}

fs.readFile(argv.file, { encoding: 'utf-8' }, function (err, data) {
  if (!err) {
    let xhrList = [];
    let parsedData = JSON.parse(data);

    //get only specified resource types, we shall discard all the rest
    const entries = parsedData?.log?.entries?.filter(
      (x) =>
        resourceTypes.includes(x._resourceType) &&
        (!ignoreUrl ||
          (ignoreUrl && !ignoreUrl.some((y) => x.request.url.includes(y)))) &&
        (!ignoreMethod ||
          (ignoreMethod &&
            !ignoreMethod.some((y) => x.request.method.includes(y))))
    );

    entries.forEach((entry) => {
      let entryItem = processEntry({ argv, entry });
      xhrList = [...entryItem, ...xhrList];
    });

    // writeFile function with filename, content and callback function
    fs.writeFile(
      argv.output,
      beautify(xhrList.join('\r\n\r\n'), {
        indent_size: 2,
        space_in_empty_paren: true
      }),
      function (err) {
        if (err) throw err;
        console.log('File has been created');
      }
    );
  } else {
    console.log(err);
  }
});
