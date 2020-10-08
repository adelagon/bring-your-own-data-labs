#!/usr/bin/env python3
import copy

mobile = open("aws-exports-template.js").read()
sdk = open("aws-sdk-exports-template.js").read()

outputs = open("outputs.txt")
for x in outputs.readlines():
  Key, Val = x.split("=")
  mobile = mobile.replace('<' + Key + '>', Val.strip())
  sdk = sdk.replace('<' + Key + '>', Val.strip())

m = open("aws-exports.js", 'w')
m.write(mobile)
m.close()
s = open("aws-sdk-exports.js", 'w')
s.write(sdk)
s.close()