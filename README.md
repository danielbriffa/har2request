# har2request

This node application lets you grab a .har file and convert the requests to beatiful vanilla JS code. Great if you want to extract the calls to reuse in a different app, for testing purposes,etc..

## Example output

```
const npbrdddg = {
  "appName": "har2request",
  "language": 'en'
};

fetch('https://danielbriffa.com/api', {
  method: 'POST',
  headers: [{
    "name": ":method",
    "value": "POST"
  }, {
    "name": ":scheme",
    "value": "https"
  }, {
    "name": "accept",
    "value": "application/json"
  }, {
    "name": "accept-encoding",
    "value": "gzip, deflate, br"
  }, {
    "name": "content-type",
    "value": "application/json-patch+json"
  }
  }],
  body: npbrdddg
});
```

## Install package globally

`npm install -g danielbriffa/har2request`

## Quick use

`har2request --file=c:/har2fetch/myHarFile.har --output=c:/har2fetch/myFile.txt`

### Arguments

- file - The path of the .har file to parse
- output - Path of the file to be created with fetch statements
- ignoreUrl - substrings of the requestUrl to ignore. You can pass 1 argument or multiple arguments, or 1 argument and comma seperated values
- ignoreMethod - Request methods which will be ignored.
- withVars - Extracts the body payload and output it as a seperate object. Ideal for fast modification
- cleanHeaders - Remove some headers which are passed. This can be used as a flag or also with values (specifying additional headers to remove)

`har2request --file=c:/har2fetch/myHarFile.har --output=c:/har2fetch/myFile.txt --ignoreUrl=google --ignoreUrl=doubleclick --ignoreUrl=appdynamics --ignoreMethod=GET --withVars --cleanHeaders`

`har2request --file=c:/har2fetch/myHarFile.har --output=c:/har2fetch/myFile.txt --ignoreUrl=google,doubleclick,appdynamics --ignoreMethod=GET,POST --withVars --cleanHeaders=auth,ga`
