# har2request
This node application lets you grab a .har file and it outputs raw JS code to execute those requests

## Install package globally
```npm install -g danielbriffa/har2request```

## Execute
```har2request --file=c:/code/onboarding2.har --output=c:/myFile.txt```

### Arguments
- file - The path of the .har file to parse
- output - Path of the file to be created with fetch statements
- ignoreUrl - substrings of the requestUrl to ignore. You can pass 1 argument or multiple arguments, or 1 argument and comma seperated values
- ignoreMethod - Request methods which will be ignored.

```har2request --file=c:/code/onboarding2.har --output=c:/myFile.txt --ignoreUrl=google --ignoreUrl=doubleclick --ignoreUrl=appdynamics --ignoreMethod=GET```
